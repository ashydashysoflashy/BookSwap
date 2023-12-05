import './ReportItem.css'
import { useEffect, useState } from 'react';
import { S3 } from "aws-sdk";
const ReportItem = (props) => {
  const [username, setUsername] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const ad = props.ad;

  function findCommonComplaints() {
    const temp = []
    for (let i = 0; i < ad.reports.length; i++) {
      if (temp.includes(ad.reports[i].reason)) continue;
      else temp.push(ad.reports[i].reason);
    }
    return temp;
  }
  const complaints = findCommonComplaints();
  console.log(complaints);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct the query parameters
        const response = await fetch(`http://localhost:4000/api/user/${ad.user_id}`);
        const data = await response.json();

        if (response.ok) {
          setUsername(data);
        } else {
          throw new Error(data.error || "Failed to fetch results");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [ad]);

  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const s3 = new S3({
        region: process.env.REACT_APP_BUCKET_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
      });

      const urls = await Promise.all(
        ad.files.map((fileName) => {
          const filePath = `images/${fileName}`;
          return s3.getSignedUrlPromise("getObject", {
            Bucket: process.env.REACT_APP_BUCKET_NAME,
            Key: filePath,
            Expires: 60,
          });
        })
      );

      setImageUrls(urls);
    };

    if (ad.files && ad.files.length > 0) {
      fetchImageUrls();
    }
  }, [ad.files]);


  // Function to format the date
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return (
      date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
      " at " +
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
  };

  return (
    <div className="report_container">
      <div className='report_left_container'>
        {imageUrls.length > 0 ? <img className='report_image' alt='Listing Book' src={imageUrls[0]}></img>
          : <img className='report_image' alt='Not Available'
            src={'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg'}></img>}

        <div className='report_post_info'>
          <div className='report_post_top_info'>
            <h1 className='report_post_title'>{ad.title.slice(0, 40)}{(ad.title.length > 40) ? '...' : ''}</h1>
            <h1 className='report_post_price'>{ad.price ? `$${ad.price}.00` : "Contact For Price"}</h1>
            <p className='report_post_description'>{ad.description.slice(0, 130)}{(ad.description.length > 130) ? '...' : ''}</p>
          </div>
          <div className='report_post_bottom_info'>
            <p>{ad.location} | {formatDate(ad.createdAt)}</p>
          </div>
        </div>
      </div>
      <div className='report_horizontal_line'></div>
      <div className='report_verticle_line'></div>
      <div className='report_right_container'>
        <div className='report_post_data'>
          <p className='report_post_description'><strong>Author:</strong> {username}</p>
          <p className='report_post_description'><strong>Complaints:</strong> {ad.reports.length}</p>
          <p className='report_post_description'><strong>Common Reports:</strong> {complaints.map((data, i) => {
            if (i === ad.reports.length - 1) return `${data}`
            else return `${data}, `
          })}</p>
        </div>
        <div className='report_verticle_line'></div>
        <div className='report_action_container'>
          <div className='report_action_buttons'>
            <button>Ban User</button>
            <button>Delete Listing</button>
          </div>
          <button className='report_delete_action'>Delete User</button>
        </div>
      </div>
    </div>
  )
}

export default ReportItem;