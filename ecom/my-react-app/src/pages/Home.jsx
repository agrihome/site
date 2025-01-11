import * as React from 'react';

const Home = () => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="bg-red-100">
      Home
    </div>
  );
};

export default Home;
