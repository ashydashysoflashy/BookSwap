import { useState, useEffect } from "react";
import { useAdsContext } from "../hooks/useAdsContext";
import { useNavigate, useParams } from "react-router-dom";
import { tagOptions } from "./tagOptions";
import { universityOptions } from "./universityOptions";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import S3FileUpload from "react-s3";
import { S3 } from "aws-sdk";
import { useAuthContext } from "../hooks/useAuthContext";
import uploadIcon from "../assets/upload.png";
import "./AdForm.css";

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  dirName: "images" /* optional */,
  region: process.env.REACT_APP_BUCKET_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
};

const UpdateAdForm = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useAdsContext();

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [ad, setAd] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newFiles, setNewFiles] = useState([]);
  const [category, setCategory] = useState("");
  const [university, setUniversity] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState([]);
  const [price, setPrice] = useState(0);
  const [swapBook, setSwapBook] = useState("");
  const [priceEnabled, setPriceEnabled] = useState(true);
  const [fetchedImageUrls, setFetchedImageUrls] = useState([]);

  /* Fix selector layer order */
  const [activeDropdown, setActiveDropdown] = useState('');
  //options for different categories an ad can have
  const categoryOptions = [
    { value: "business", label: "Business" },
    { value: "computerScience", label: "Computer Science" },
    { value: "education", label: "Education" },
    { value: "engineering", label: "Engineering" },
    { value: "law", label: "Law" },
    { value: "math", label: "Mathematics" },
    { value: "medicine", label: "Medicine" },
    { value: "naturalScience", label: "Natural Science" },
  ];

  //fetch the ad that will be updated and set state
  useEffect(() => {
    const fetchAd = async () => {
      const response = await fetch(`http://localhost:4000/api/ads/${id}`);
      const adData = await response.json();
      if (response.ok) {
        //if the ad user id is not the logged in users id then go to home page
        if (user && user.id !== adData.user_id){
          navigate('../home')
        }
        //set all the state for the ad
        setAd(adData);
        setTitle(adData.title);
        setDescription(adData.description);
        setCategory(adData.category);
        setUniversity(adData.university);
        setLocation(adData.location);
        // Transform the tags into the format expected by CreatableSelect
        const transformedTags = adData.tags.map((tag) => ({
          label: tag,
          value: tag,
        }));
        setTags(transformedTags);
        setPrice(adData.price);
        setSwapBook(adData.swapBook);
        setFetchedImageUrls(adData.imageUrls);
      } else {
        // Handle errors or redirect if the ad couldn't be fetched
        console.log("error updating ad")
      }
    };
    //get the ad
    fetchAd();
  }, [id]);

  //fetch all the images from AWS
  useEffect(() => {
    const fetchImageUrls = async () => {
      if (ad && ad.files) {
        const s3 = new S3(config);

        const urls = await Promise.all(
          ad.files.map((fileName) => {
            const filePath = `images/${fileName}`;
            return s3.getSignedUrlPromise("getObject", {
              Bucket: config.bucketName,
              Key: filePath,
              Expires: 60,
            });
          })
        );

        setFetchedImageUrls(urls);
      }
    };

    if (ad && ad.files && ad.files.length > 0) {
      fetchImageUrls();
    }
  }, [ad]);

  //function to check if user is on price radio or book swap radio button
  const radioChanged = (e) => {
    if (e.target.id === "price_radio") setPriceEnabled(true);
    else setPriceEnabled(false);
  };

  //function for when user submits update ad form
  const handleSubmit = async (e) => {
    e.preventDefault();
    //upload files to aws
    await Promise.all(
      newFiles.map((file) => {
        return S3FileUpload.uploadFile(file, config).then(
          (response) => response.location
        );
      })
    );

    //handle logic between price being book swap option and user setting a $ price
    let currentPrice = price;
    if (!priceEnabled) {
      currentPrice = 0;
    }
    let currentSwapBook = swapBook;
    if (!priceEnabled && !currentSwapBook.trim()) {
      currentSwapBook = "Please Contact Seller";
    }
    //object for all the data of the ad
    const adData = {
      title,
      description,
      files: [...ad.files, ...newFiles.map((file) => file.name)],
      category,
      university,
      location,
      tags: tags.map((t) => t.value),
      price: currentPrice,
      swapBook: currentSwapBook,
    };
    //api request to patch (update) the ad
    const response = await fetch(`http://localhost:4000/api/ads/${id}`, {
      method: "PATCH",
      body: JSON.stringify(adData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const jsonData = await response.json();
    if (!response.ok) {
      //error handling
      setError(jsonData.error);
      navigate(`/home`);
    } else {
      //update state
      setTitle("");
      setDescription("");
      setNewFiles([]);
      setCategory("");
      setLocation("");
      setTags([]);
      setPrice(0);
      setSwapBook("");
      setError(null);
      setEmptyFields([]);
      //update global state and go to listing page
      dispatch({ type: "UPDATE_AD", payload: jsonData });
      navigate(`/listings/${id}`);
    }
  };

  //function to add image to array of images
  const handleAddImage = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setNewFiles([...newFiles, ...uploadedFiles]);
    e.target.value = null;
  };

  //function to remove image from array of images
  const handleRemoveExistingImage = (event, fileNameToRemove) => {
    event.preventDefault();

    if (!ad || !ad.files) return;

    // Filter out the file to be removed
    const updatedFiles = ad.files.filter(
      (fileName) => fileName !== fileNameToRemove
    );

    // Update the ad state
    setAd({ ...ad, files: updatedFiles });

    // Also update the fetchedImageUrls to reflect this change
    const updatedUrls = fetchedImageUrls.filter(
      (_, index) => ad.files[index] !== fileNameToRemove
    );
    setFetchedImageUrls(updatedUrls);
  };

  //function to remove image from array of images
  const handleRemoveNewImage = (index) => {
    const updatedFiles = newFiles.filter((_, i) => i !== index);
    setNewFiles(updatedFiles);
  };

  return (
    <form className="create_ad" onSubmit={handleSubmit}>
      <div className="ad_section">
        <div className="ad_main">
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Add Title"
            className={
              emptyFields.includes("title")
                ? "input_field field_error"
                : "input_field"
            }
            required
          />

          <textarea
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Description"
            className={
              emptyFields.includes("description")
                ? "input_field field_error"
                : "input_field"
            }
            required
          />

          <div className="ad_images">
            {/* <p>Images</p> */}
            {fetchedImageUrls &&
              fetchedImageUrls.length > 0 &&
              fetchedImageUrls.map((imageUrl, index) => (
                <div key={index} className="image-preview">
                  <img src={imageUrl} alt={`Content ${index + 1}`} />
                  <button onClick={(e) => handleRemoveExistingImage(e, ad.files[index])}>
                    Remove
                  </button>
                </div>
              ))}

            {newFiles &&
              newFiles.length > 0 &&
              newFiles.map((file, i) => (
                <div key={i} className="image-preview">
                  <img src={URL.createObjectURL(file)} alt={file.name} />
                  <button onClick={() => handleRemoveNewImage(i)}>
                    Remove
                  </button>
                </div>
              ))}

            <label htmlFor="update_upload" className="upload_button_label">
              <img src={uploadIcon} alt="Upload" />
              <span>Upload Images</span>
            </label>
            <input
              type="file"
              id="update_upload"
              style={{ display: "none" }}
              onChange={handleAddImage}
              multiple
            ></input>
          </div>
        </div>
        <div className="ad_side">
          <Select
            options={categoryOptions}
            value={categoryOptions.find((option) => option.value === category)}
            onChange={(selectedOption) => setCategory(selectedOption.value)}
            className={`react-select-container ${activeDropdown === 'category' ? 'active-dropdown' : ''}`}
            onMenuOpen={() => setActiveDropdown('category')}
            onMenuClose={() => setActiveDropdown('')}
            classNamePrefix="react-select"
            placeholder="Select Category"
          />
          <Select
            options={universityOptions}
            value={universityOptions.find(
              (option) => option.value === university
            )}
            onChange={(selectedOption) => setUniversity(selectedOption.value)}
            className={`react-select-container ${activeDropdown === 'university' ? 'active-dropdown' : ''}`}
            onMenuOpen={() => setActiveDropdown('university')}
            onMenuClose={() => setActiveDropdown('')}
            classNamePrefix="react-select"
            placeholder="Select University"
          />

          <CreatableSelect
            isMulti
            options={tagOptions}
            value={tags} // tags should be an array of objects like [{ label: 'tag1', value: 'tag1' }]
            onChange={(selectedOptions) => setTags(selectedOptions || [])}
            className={`react-select-container ${activeDropdown === 'tag' ? 'active-dropdown' : ''}`}
            onMenuOpen={() => setActiveDropdown('tag')}
            onMenuClose={() => setActiveDropdown('')}
            classNamePrefix="react-select"
            placeholder="Select Tags"
          />

          <div className="price_section">
            <p>Price / Swap</p>
            <div className="price_swap_section">
              <input
                id="price_radio"
                type="radio"
                name="price"
                onChange={radioChanged}
                checked={priceEnabled}
              ></input>
              <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                min={0}
                max={500}
                placeholder="Price"
                className={
                  emptyFields.includes("price")
                    ? "input_field_price field_error"
                    : "input_field_price"
                }
                disabled={priceEnabled ? false : true}
              />
              <input
                id="swap_radio"
                type="radio"
                name="price"
                onChange={radioChanged}
              ></input>
              <input
                type="text"
                onChange={(e) => setSwapBook(e.target.value)}
                value={swapBook}
                placeholder="Swap Book"
                className={
                  emptyFields.includes("swap")
                    ? "input_field_swap field_error"
                    : "input_field_swap"
                }
                disabled={priceEnabled ? true : false}
              />
            </div>
          </div>
        </div>
      </div>
      <button className="post_button">Update Ad</button>
      {error && <div className="register-error">{error}</div>}
    </form>
  );
};

export default UpdateAdForm;
