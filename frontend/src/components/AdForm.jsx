import { useState } from "react";
import { useAdsContext } from "../hooks/useAdsContext";
import { useNavigate } from "react-router-dom";
import { tagOptions } from "./tagOptions";
import { universityOptions } from "./universityOptions";
import { categoryOptions } from "./categoryOptions";
import { useAuthContext } from "../hooks/useAuthContext";
import uploadIcon from "../assets/upload.png";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import S3FileUpload from "react-s3";
import "./AdForm.css";

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  dirName: "images" /* optional */,
  region: process.env.REACT_APP_BUCKET_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
};

const AdForm = () => {
  //get the user
  const { user } = useAuthContext();
  let navigate = useNavigate();

  //global state and error handling
  const { dispatch } = useAdsContext();
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [loading,setLoading] = useState(false);

  //state for all the input fields in the form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [university, setUniversity] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [price, setPrice] = useState(0);
  const [swapBook, setSwapBook] = useState("");
  const [priceEnabled, setPriceEnabled] = useState(true);

  /* Fix selector layer order */
  const [activeDropdown, setActiveDropdown] = useState('');

  //function to handle state between price radio and bookswap radio
  const radioChanged = (e) => {
    if (e.target.id === "price_radio") setPriceEnabled(true);
    else setPriceEnabled(false);
  };

  //function to submit the create ad form
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    //if no user then return
    if (!user) {
      setError("Must be logged in to create an ad");
      return;
    }

    //check if user has selected to "swap book" instead of selecting a price
    let swapBookValue = swapBook;
    if (!priceEnabled && !swapBook.trim()) {
      swapBookValue = "Please Contact Seller";
    }
    //upload the images of the ad to aws s3 storage
    for (const file of files) {
      await S3FileUpload.uploadFile(file, config);
    }
    //structure containing all the details of an ad
    const ad = {
      user_id: user.id,
      title,
      description,
      files: files.map((file) => ({
        name: file.name,
        src: URL.createObjectURL(file),
      })),
      category,
      university,
      tags,
      price,
      swapBook: swapBookValue
    };
    //send a POST request to the api with the ad as the body
    const response = await fetch("http://localhost:4000/api/ads", {
      method: "POST",
      body: JSON.stringify(ad),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    //error handling
    if (!response.ok) {
      console.log("error", json);
      console.log(json.error);
      setError(`${json.error} | ${json.emptyFields}`);
      setEmptyFields(json.emptyFields);
      setLoading(false)
    }
    //reset the form
    if (response.ok) {
      setTitle("");
      setDescription("");
      setFiles([]);
      setCategory("");
      setTags("");
      setPrice(0);
      setSwapBook("");
      setError(null);
      setEmptyFields([]);
      setLoading(false)
      //update global state
      dispatch({ type: "CREATE_AD", payload: json });
      //navigate to home page
      navigate("/home");
    }
    setLoading(false)
  };
  //function to add an image to the array of images 
  const handleAddImage = (e) => {
    if (e.target.files.length > 0) {
      let newFiles = [...files];

      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];

        if (!newFiles.some((f) => f.name === file.name)) {
          newFiles.push(file);
        }
      }
      setFiles([...newFiles]);
    }
    e.target.value = null;
  };

  //function to remove an image from the array of images
  const handleRemoveImage = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
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

            {files.map((file, i) => (
              <div key={i} className="image-preview">
                <img src={URL.createObjectURL(file)} alt={file.name} />
                <button onClick={() => handleRemoveImage(file.name)}>Remove</button>
              </div>
            ))}
            <label htmlFor="upload_image" className="upload_button_label">
              <img src={uploadIcon} alt="Upload" />
              <span>Upload Images</span>
            </label>
            <input
              type="file"
              id="upload_image"
              style={{ display: "none" }}
              onChange={handleAddImage}
              multiple
            ></input>
          </div>
        </div>
        <div className="ad_side">
          <Select
            options={categoryOptions}
            onChange={(e) => {
              setCategory(e.value);
            }}
            className={`react-select-container ${activeDropdown === 'category' ? 'active-dropdown' : ''}`}
            onMenuOpen={() => setActiveDropdown('category')}
            onMenuClose={() => setActiveDropdown('')}
            classNamePrefix="react-select"
            placeholder="Select Category"
          />

          <Select
            options={universityOptions}
            onChange={(selectedOption) => setUniversity(selectedOption.value)}
            className={`react-select-container ${activeDropdown === 'university' ? 'active-dropdown' : ''}`}
            onMenuOpen={() => setActiveDropdown('university')}
            onMenuClose={() => setActiveDropdown('')}
            classNamePrefix="react-select"
            placeholder="Select University"
            value={universityOptions.find(
              (option) => option.value === university
            )}
          />

          <CreatableSelect
            isMulti
            options={tagOptions}
            onChange={(selectedOptions) =>
              setTags(
                selectedOptions
                  ? selectedOptions.map((option) => option.value)
                  : []
              )
            }
            value={tags.map((tag) => ({ label: tag, value: tag }))}
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
                onChange={(e) => { setSwapBook(''); setPrice(e.target.value) }}
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
                onChange={(e) => { setSwapBook(e.target.value); setPrice(0) }}
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
      <button className="post_button" disabled={loading}>Post Ad</button>
      {error && <div className="register-error">{error}</div>}
    </form>
  );
};

export default AdForm;
