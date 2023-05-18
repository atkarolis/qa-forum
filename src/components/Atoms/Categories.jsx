export const CategoryEnum = [
  "Interior maintenance",
  "Exterior maintenance",
  "Other"
]

const Categories = ({categories}) => {
  categories.forEach(category => category)
  return (
    <>
      <span>{categories}</span>
    </>
  );
}
 
export default Categories;