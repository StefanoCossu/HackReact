export default function StoresList({ stores, searchParams, setSearchParams }) {
    const handleChange = (id) => {
      const allParams = Object.fromEntries([...searchParams]);
  
      setSearchParams({
        ...allParams,
        stores: id,
      });
    };
    return (
      <>
        <p className="mb-4 text-xl">Stores</p>
        <div className="h-72 overflow-y-scroll">
          {stores.map((el) => (
            <p
              onClick={() => handleChange(el.id)}
              key={el.id}
              className={
                searchParams.get("stores") === el.id
                  ? "border-b-2 border-accent font-bold tracking-widest cursor-pointer"
                  : "cursor-pointer"
              }
            >
              {el.name}
            </p>
          ))}
        </div>
      </>
    );
  }
  