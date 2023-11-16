import { useAdsContext } from "../hooks/useAdsContext";
import './AdOverview.css';

const AdOverview = ({ ad }) => {
  const { dispatch } = useAdsContext();

  const handleDelete = async () => {
    const response = await fetch('http://localhost:4000/api/ads/' + ad._id, {
      method: 'DELETE'
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({type: 'DELETE_AD', payload: json});
    }
  }

  return (
    <div className="ad_overview">
      <div className="ad_image">
        <img src="https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg" alt="not available"></img>
      </div>
      <div className="ad_information">
        <h2>{ad.title}</h2>
        <h3>${ad.price}</h3>
        <h4>{ad.description}</h4>
        <p>{ad.createdAt}</p>
        <span onClick={handleDelete}>Test Delete Ad</span>
      </div>
    </div>
  )
}

export default AdOverview;