const getDataFromBackend = async () => {
  const rest = await fetch('http://localhost:8000/data');
  const data = await rest.json();

  return data;
};

const res = await getDataFromBackend();
console.log(res);
