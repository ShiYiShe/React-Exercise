import { useSearchParams } from "react-router-dom";
// import { useParams } from "react-router-dom";

const Article = () => {
  const [params] = useSearchParams();
  const id = params.get('id');
  const name = params.get('name');

  // const params = useParams();
  // const id = params.id;
  // const name = params.name;
  return(
    <div>
      This is Article component.
      Id is {id} and name is {name}.
    </div>
  )
}

export default Article;