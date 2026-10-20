import AboutUs from "./about-us";

const aboutusData = [
    {
      count: "236",
      title: "Residences designed for modern families"
    },
    {
      count: "6.8k",
      title: "Square feet of landscaped greens and open spaces"
    },
    {
      count: "40+",
      title: "Secure parking spaces for residents and visitors"
    }
];


const AboutAndStats04 = () => {
  return (
    <>
      <AboutUs aboutusData={aboutusData} />
    </>
  );
};

export default AboutAndStats04;
