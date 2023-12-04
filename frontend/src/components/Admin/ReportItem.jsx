import './ReportItem.css'
const ReportItem = (props) => {
  const data = props.data;
  return (
    <div className="report_container">
      <img className='report_image' alt='Listing Book' src={data.imageURL}></img>
      <div className='report_post_info'>
        <div className='report_post_top_info'>
          <h1 className='report_post_title'>{data.title.slice(0, 40)}{(data.title.length > 40) ? '...' : ''}</h1>
          <h1 className='report_post_price'>{data.price}</h1>
          <p className='report_post_description'>{data.description.slice(0, 130)}{(data.description.length > 130) ? '...' : ''}</p>
        </div>
        <div className='report_post_bottom_info'>
          <p>{data.university} | {data.date}</p>
        </div>
      </div>
      <div className='report_verticle_line'></div>
      <div className='report_post_data'>
        <p className='report_post_description'><strong>Author:</strong> {data.author}</p>
        <p className='report_post_description'><strong>Listing Complaints:</strong> {data.reports}</p>
        <p className='report_post_description'><strong>User Complaints:</strong> {data.authorReports}</p>
        <p className='report_post_description'><strong>Common Offenses:</strong> {data.offense.map((str, i) => {
          if (i === data.offense.length - 1) return str;
          else return `${str}, `;
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
  )
}

export default ReportItem;