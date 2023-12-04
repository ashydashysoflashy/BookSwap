import './AdminContent.css'
import ReportItem from './ReportItem';

const AdminContent = () => {

  const testAd = {
    title: "This object is only for test, please replace this by fetching an actual reported ad",
    description: "This is a sample description of a listing that is reported a lot of times " +
      "and possibly has a listing for a prohibited item",
    imageURL: "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg",
    price: "$70.00",
    university: "University of Calgary",
    date: "December 1, 2023",
    author: "GuyWhoKindaStudies292",
    reports: "34",
    authorReports: "4",
    offense: ["Incorrect Information", "Prohibited Content"],
  }

  return (
    <div className="admin_content_container">
      <div className='admin_content_top'>
        <h1>Showing 1-40 of 340 results</h1>
        <h1>Sort By:</h1>
      </div>
      <div className='admin_report_container'>
        <ReportItem data={testAd}/>
      </div>
    </div>
  )
}

export default AdminContent;