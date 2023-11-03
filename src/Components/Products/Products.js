import React, { useState, useEffect, useMemo } from "react";
import { Grid, Button } from "@mui/material";
import Product from "./Product";
import useMediaQuery from "@mui/material/useMediaQuery";
import productsData from "../../data/products.json";

const Products = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTodos, setTotalTodos] = useState(0);
  const todosPerPage = 9;

  useEffect(() => {
    setTodos(productsData);
  }, []);

  const minWidth = useMediaQuery("(max-width:600px)");
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  const todosData = useMemo(() => {
    let computedTodos = todos;

    if (searchTerm) {
      computedTodos = computedTodos.filter((todo) =>
        todo.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory) {
      computedTodos = computedTodos.filter(
        (todo) => todo.category === filterCategory
      );
    }

    if (filterPrice) {
      if (filterPrice === "Under $400") {
        computedTodos = computedTodos.filter(
          (todo) => parseInt(todo.price.substring(1)) < 400
        );
      } else if (filterPrice === "$400 - $600") {
        computedTodos = computedTodos.filter(
          (todo) =>
            parseInt(todo.price.substring(1)) >= 400 &&
            parseInt(todo.price.substring(1)) <= 600
        );
      } else if (filterPrice === "Over $600") {
        computedTodos = computedTodos.filter(
          (todo) => parseInt(todo.price.substring(1)) > 600
        );
      }
    }

    setTotalTodos(computedTodos.length);

    // Current Page slice
    return computedTodos.slice(
      (currentPage - 1) * todosPerPage,
      (currentPage - 1) * todosPerPage + todosPerPage
    );
  }, [todos, currentPage, searchTerm, filterCategory, filterPrice]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const resetFilter = () => {
    setSearchTerm("");
    setFilterCategory("");
    setFilterPrice("");
    setCurrentPage(1);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <select
          style={{
            padding: "10px",
            backgroundColor: "#1f293b",
            color: "white",
            border: "none",
            borderRadius: "3px",
            fontFamily: "Poppins",
            fontSize: "17px",
            marginRight: "10px",
            cursor: "pointer",
          }}
          value={filterCategory}
          onChange={(e) => {
            setFilterCategory(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Vehicles">Vehicles</option>
          <option value="Shoes">Shoes</option>
          <option value="Toy">Toy</option>
          <option value="Clothe">Clothe</option>
        </select>

        <select
          style={{
            padding: "10px",
            backgroundColor: "#1f293b",
            color: "white",
            border: "none",
            borderRadius: "3px",
            fontFamily: "Poppins",
            fontSize: "17px",
            marginRight: "10px",
            cursor: "pointer",
          }}
          value={filterPrice}
          onChange={(e) => {
            setFilterPrice(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Prices</option>
          <option value="Under $400">Under $400</option>
          <option value="$400 - $600">$400 - $600</option>
          <option value="Over $600">Over $600</option>
        </select>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <button
          style={{
            padding: "10px",
            backgroundColor: "#1f293b",
            color: "white",
            border: "none",
            borderRadius: "3px",
            fontFamily: "Poppins",
            fontSize: "17px",
            cursor: "pointer",
          }}
          type="button"
          onClick={resetFilter}
        >
          Reset Filters
        </button>
      </div>
      <Grid
        container
        spacing={3}
        style={{
          paddingLeft: minWidth ? "20px" : "50px",
          paddingRight: minWidth ? "20px" : "50px",
        }}
      >
        {todosData.map((todo) => (
          <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={todo.id}>
            <Product product={todo} />
          </Grid>
        ))}
      </Grid>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {pageNumbers.map((number) => (
          <span key={number} style={{ margin: "0 5px", marginTop: "20px" }}>
            <Button
              variant="contained"
              onClick={() => paginate(number)}
              style={{
                background: currentPage === number ? "white" : "#8858ed",
                color: currentPage === number ? "#8858ed" : "white",
                fontFamily: "Poppins",
                fontSize: "16px",
              }}
            >
              {number}
            </Button>
          </span>
        ))}
      </div>
    </>
  );
};

export default Products;
