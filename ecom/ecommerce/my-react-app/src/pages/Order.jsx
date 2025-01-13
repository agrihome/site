import DataTable from "../components/DataTable";

export default function Product() {
  const listColumns = ['order_id','status','total_amount','tracking_id'];

  return (
    <DataTable model={'order'} listColumns={listColumns} />
  );
}
