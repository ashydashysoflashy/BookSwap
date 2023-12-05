import { useEffect, useState } from 'react';
import { useAdsContext } from "../../hooks/useAdsContext";
import Select from 'react-select';
import './AdminContent.css'
import ReportItem from './ReportItem';

const AdminContent = ({ admin }) => {
  const { ads, dispatch } = useAdsContext();
  const [sort, setSort] = useState("most_reports");
  const [sortedAds, setSortedAds] = useState([])

  const sortOptions = [
    { value: "most_reports", label: "Most Reports first" },
    { value: "least_reports", label: "Least Reports first" }
  ];

  useEffect(() => {
    const fetchAds = async () => {
      const params = new URLSearchParams({
        sort: sort
      });

      const response = await fetch(`http://localhost:4000/api/ads/getadminads?${params}`);
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ADS", payload: json });
        setSortedAds(json)
      }
    };
    fetchAds();
  }, [dispatch, sort]);

  const handleDeleteListingParent = (deletedAdId) => {
    setSortedAds((prevAds) => prevAds.filter((ad) => ad._id !== deletedAdId));
  };

  const handleBanUserParent = (deletedUserId) => {
    setSortedAds((prevAds) => prevAds.filter((ad) => ad.user_id !== deletedUserId));
  };

  return (
    <div className="admin_content_container">
      <div className='admin_content_top'>
        <h1>{`Showing ${sortedAds && sortedAds.length} Results`}</h1>
        <Select
          options={sortOptions}
          value={sortOptions.find((option) => option.value === sort)}
          onChange={(e) => setSort(e.value)}
          className="react-select-container-results admin_sort_select"
          classNamePrefix="react-select"
          placeholder="Sort by" />

      </div>
      <div className='admin_report_container'>
        {sortedAds && sortedAds.map((ad) => <ReportItem key={ad._id} ad={ad} admin={admin} dispatch={dispatch} handleDeleteListingParent={handleDeleteListingParent} handleBanUserParent={handleBanUserParent} />)}
      </div>
    </div>
  )
}

export default AdminContent;