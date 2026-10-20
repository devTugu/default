// @ts-nocheck
"use client";

import { useState } from "react"
import { Heart, Star } from "lucide-react";
import { Button } from "@default/ui/primitives/button";
import { Card, CardContent } from "@default/ui/primitives/card";
import { cn } from "@default/ui/lib/cn";

interface Product {
    id: string;
    name: string;
    category: string;
    rating: number;
    reviews: number;
    price: number;
    oldPrice?: number;
    image: string;
    isNew?: boolean;
    onSale?: boolean;
}

interface ProductCategoryProps {
    product: Product;
}

const defaultProduct: Product = {
    id: "1",
    name: "Apple Watch S9",
    category: "Electronics",
    rating: 4.5,
    reviews: 105,
    price: 684,
    oldPrice: 855,
    image: "https://images.shadcnspace.com/assets/ecommerce/product-category/product-category-03-1.webp",
    onSale: true,
};

const ProductCategory = ({ product = defaultProduct }: ProductCategoryProps) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    return (
        <div className="flex items-center justify-center">
            <div className="w-67.5 shrink-0">
                <Card className="p-0 ring-0 gap-0 overflow-hidden border border-border bg-card rounded-2xl">
                    <div className="relative rounded-t-2xl h-55 overflow-hidden flex items-center justify-center">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <Button
                            variant="secondary"
                            size="icon"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsWishlisted((prev) => !prev);
                            }}
                            className={cn(
                                "absolute top-3 right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all",
                                isWishlisted && "text-destructive",
                            )}
                        >
                            <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
                        </Button>
                    </div>
                    <CardContent className="p-5 flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-muted-foreground">
                                {product.category}
                            </p>
                            <p className="text-lg font-medium text-foreground line-clamp-1">
                                {product.name}
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={cn(
                                                "h-3.5 w-3.5",
                                                i < Math.floor(product.rating)
                                                    ? "fill-orange-400 text-orange-400"
                                                    : "fill-muted text-muted stroke-orange-400",
                                            )}
                                        />
                                    ))}
                                </div>
                                <small className="text-sm font-normal text-foreground">
                                    {product.rating}
                                </small>
                                <small className="text-sm font-normal text-foreground">
                                    ({product.reviews})
                                </small>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-lg font-medium text-foreground">
                                    ${product.price}
                                </span>
                                {product.oldPrice && (
                                    <span className="text-lg font-medium text-muted-foreground line-through decoration-muted-foreground/50">
                                        ${product.oldPrice}
                                    </span>
                                )}
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full h-10 rounded-lg font-medium border-border transition-colors duration-300 dark:bg-background dark:border-border cursor-pointer"
                        >
                            Add to Cart
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ProductCategory;