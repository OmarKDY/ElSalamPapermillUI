import { Component, OnInit } from '@angular/core';

interface MyObject {
  productImg: string;
  productName: string;
  productUsage: string;
  productSize: string;
  productDesc: string;
  Applications: string[];
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: MyObject[] = [
    { productImg: "assets/images/product/CoatedDuplexBoard.jpg",
      productName: "Coated Duplex Board", 
      productUsage: "Packaging Board", 
      productSize: "250-400 GSM", 
    productDesc: "This coated duplex board is a sturdy and versatile paperboard with a smooth, coated surface on both sides. It offers exceptional strength and rigidity.", 
    Applications: [
      "Packaging: Ideal for high-quality packaging solutions, such as boxes, cartons, and displays, where a strong and attractive appearance is required.",
      "Promotional Materials: Suitable for printing vibrant and eye-catching graphics, making it perfect for promotional materials, brochures, and marketing collateral.",
      "Graphic Design: Provides an excellent printing surface for high-resolution images and detailed designs, making it a top choice for graphic design projects.",
      ]
  },
    { productImg: "assets/images/product/GreyBoard.jpg",
      productName: "Grey Board", 
      productUsage: "Rigid Cardboard", 
      productSize: "140-400 GSM", 
    productDesc: "This grey board, also known as gray cardboard or chipboard, is a durable and rigid paperboard with a gray-colored center layer. It offers excellent strength and stability.", 
    Applications: [
      "Bookbinding and Notebook Covers: Used in the production of hardcover books, notebooks, and journals, providing sturdiness and protection.",
      "Puzzle and Game Boards: Ideal for creating puzzle pieces and game boards that require durability and thickness.",
      "Packaging and Boxes: Suitable for rigid packaging, gift boxes, and custom-made boxes where strength and stability are essential."
    ]
  },
    { productImg: "assets/images/product/PristolBoard.jpg",
      productName: "Bristol Board", 
      productUsage: "Artist's Board", 
      productSize: "140-400 GSM",
    productDesc: "This heavyweight and smooth bristol board is specifically designed for artists, designers, and illustrators. It offers excellent printing and drawing characteristics.", 
    Applications: [
      "Art and Crafts: Preferred by artists for creating detailed drawings, illustrations, and mixed media artwork due to its smooth surface and ability to withstand various mediums.",
      "Sketchbooks and Drawing Pads: Used for sketching, doodling, and creating detailed drawings, offering a reliable surface for pencils, markers, and ink.",
      "Posters and Prints: Suitable for high-quality posters, art prints, and limited edition reproductions, where color accuracy and vibrancy are crucial."
    ]
  },
  { productImg: "assets/images/product/ManilaBoard.jpg",
  productName: "Manilla Board", 
  productUsage: "File Board", 
  productSize: "140-400 GSM",
productDesc: "This sturdy and moisture-resistant manila board is perfect for file folders, office supplies, and various applications that require strength and resistance.", 
Applications: [
  "File Folders and Office Supplies: Widely used for producing file folders, dividers, and office organizers, providing durability and longevity.",
  "Envelope Production: Suitable for manufacturing durable envelopes that can withstand handling and transportation.",
  "Backing Board: Ideal for providing support and reinforcement to notepads, notebooks, and other stationery products."
]
},
{ productImg: "assets/images/product/LimaPrint.jpg",
productName: "Lema Print", 
productUsage: "Premium Printing Paper", 
productSize: "250-400 GSM",
productDesc: "This heavyweight and high-quality printing paper is specially designed for premium printing applications, offering exceptional printability and results.", 
Applications: [
"Packaging Design: Used for creating luxurious packaging designs, product boxes, and high-end product labels that require crisp and vibrant printing.",
"Brochures and Catalogs: Ideal for producing visually stunning brochures, catalogs, and marketing materials that demand superior print quality.",
"Business Cards and Postcards: Suitable for creating impressive business cards, postcards, and invitations that leave a lasting impression."
]
},
{ productImg: "assets/images/product/WhiteTop.jpg",
productName: "White Top", 
productUsage: "Display Board", 
productSize: "140 GSM",
productDesc: "This lightweight paperboard with a white, coated surface on one side is perfect for applications that require a clean and printable surface.", 
Applications: [
"Point-of-Purchase Displays: Used for creating attention-grabbing displays, signage, and standees in retail environments.",
"Signage and Posters: Suitable for indoor signage, promotional posters, and informational displays.",
"Educational Materials: Ideal for producing visual aids, flashcards, and educational charts where clarity and visibility are essential."
]
},
{ productImg: "assets/images/product/WhiteTopEco.jpg",
productName: "White Top ECO", 
productUsage: "Environmentally Friendly Board", 
productSize: "140 GSM",
productDesc: "This eco-friendly paperboard features a white, coated surface on one side and is produced using sustainable materials and processes.", 
Applications: [
"Sustainable Packaging: Used for eco-friendly packaging solutions, sustainable product boxes, and environmentally conscious brands.",
"Promotional Materials: Suitable for green marketing campaigns, brochures, and promotional materials that highlight sustainability efforts.",
"Printing Projects: Ideal for various printing applications where an environmentally friendly option is preferred, such as eco-conscious magazines and publications."
]
}
  ];
  selectedProduct: MyObject | null = null;
  showProduct: boolean = false;

  ngOnInit() {
  }

  showProductDetails(product: MyObject, showProduct: boolean) {
    if (product != null) {
      this.selectedProduct = product;
      showProduct == true
      window.scrollTo({ top: 0, behavior: 'smooth' });
      console.log(this.selectedProduct)
    }
    else {
      showProduct == false
    }
    this.showProduct = showProduct;
  }
}
