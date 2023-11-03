import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";

const Product = ({ product }) => {
  return (
    <>
      <Card style={{ backgroundColor: "#1f293b" }}>
        <CardMedia
          component="img" // Specify that the media component is an image
          alt={product.name}
          height="200"
          image={product.image}
          title={product.name}
        />
        <CardContent>
          <Typography
            variant="h6"
            style={{
              color: "white",
              fontFamily: "Poppins",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "white",
              fontFamily: "Poppins",
            }}
          >
            {product.desc}
          </Typography>
          <Typography
            variant="h6"
            style={{
              color: "#A6FF96",
              fontFamily: "Poppins",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            {product.price}
          </Typography>
          <Typography
            variant="h6"
            style={{
              color: "white",
              fontFamily: "Poppins",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {product.category}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Product;
