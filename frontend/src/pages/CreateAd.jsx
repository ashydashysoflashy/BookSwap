import AdForm from "../components/AdForm";

const CreateAd = () => {
  return (
    <div className="create_ad">
      <h1>Create Your Ad</h1>
      <p>Fill in the details below to post your ad.</p>
      <AdForm />
    </div>
  );
}

export default CreateAd;