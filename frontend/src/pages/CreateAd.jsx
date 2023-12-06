// Importing necessary component
import AdForm from "../components/AdForm";

// CreateAd functional component
const CreateAd = () => {
  return (
      <div className="create_ad">
          {/* Heading for the Create Ad page */}
          <h1>Create Your Ad</h1>
          <p>Fill in the details below to post your ad.</p>
      <AdForm />
    </div>
  );
}

// Export component
export default CreateAd;