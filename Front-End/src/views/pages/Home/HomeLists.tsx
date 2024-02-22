import City from "@/views/components/city";
import FeaturedProperty from "@/views/components/featuredProperty";
import Footer from "@/views/components/footer";
import MailList from "@/views/components/mailList";
import PropertyList from "@/views/components/propertyList";

export const HomeLists = () => {
  return (
    <div
      className="flex items-center gap-8 flex-col"
      style={{ marginTop: "50px" }}
    >
      <City />
      <h1 style={{ width: "1024px", fontSize: "20px" }}>
        Browse by property type
      </h1>
      <PropertyList />
      <h1 style={{ width: "1024px", fontSize: "20px" }}>Home guest love</h1>
      <FeaturedProperty />
      <MailList />
      <Footer />
    </div>
  );
};
