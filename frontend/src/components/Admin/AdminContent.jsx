import { useEffect, useState } from 'react';
import { useAdsContext } from "../../hooks/useAdsContext";
import Select from 'react-select';
import './AdminContent.css'
import ReportItem from './ReportItem';

const AdminContent = () => {
  const { ads, dispatch } = useAdsContext();
  const [sort, setSort] = useState();

  const sortOptions = [
    { value: "test", label: "Most Reports first" },
    { value: "test1", label: "Least Reports first" },
    { value: "test2", label: "Newly Reported" }
  ];

  useEffect(() => {
    const fetchAds = async () => {
      const response = await fetch("http://localhost:4000/api/ads");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ADS", payload: json });
      }
    };
    fetchAds();
  }, [dispatch]);
  console.log(ads);

  return (
    <div className="admin_content_container">
      <div className='admin_content_top'>
        <h1>Showing 1-40 of 340 results</h1>
        <Select
          options={sortOptions}
          value={sortOptions.find((option) => option.value === sort)}
          onChange={(e) => setSort(e.value)}
          className="react-select-container-results admin_sort_select"
          classNamePrefix="react-select"
          placeholder="Sort by" />
      </div>
      <div className='admin_report_container'>
        {ads && ads.map((ad) => <ReportItem key={ad._id} ad={ad} />)}
      </div>
    </div>
  )
}

export default AdminContent;