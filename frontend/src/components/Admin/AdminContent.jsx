import { useEffect, useState } from 'react';
import { useAdsContext } from "../../hooks/useAdsContext";
import Select from 'react-select';
import './AdminContent.css'
import ReportItem from './ReportItem';

const AdminContent = ({admin}) => {
  const { ads, dispatch } = useAdsContext();
  const [sort, setSort] = useState("most_reports");

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
      }
    };
    fetchAds();
  }, [dispatch, sort]);

  return (
    <div className="admin_content_container">
      <div className='admin_content_top'>
        <h1>{`Showing ${ads && ads.length} Results`}</h1>
        <Select
          options={sortOptions}
          value={sortOptions.find((option) => option.value === sort)}
          onChange={(e) => setSort(e.value)}
          className="react-select-container-results admin_sort_select"
          classNamePrefix="react-select"
          placeholder="Sort by" />

      </div>
      <div className='admin_report_container'>
        {ads && ads.map((ad) => <ReportItem key={ad._id} ad={ad} admin={admin} dispatch={dispatch}/>)}
      </div>
    </div>
  )
}

export default AdminContent;