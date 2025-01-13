import DataTable from "../components/DataTable";

export default function Product() {
  const listColumns = ['name','description','stock'];

  return (
    <DataTable model={'product'} listColumns={listColumns} />
  );
}
