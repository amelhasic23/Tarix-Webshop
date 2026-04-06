#!/usr/bin/env python3
"""
Automatically adds data-translate attributes to ALL text elements in HTML
"""
import re

def add_translations_to_html(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        html = f.read()

    # Define comprehensive translation mappings
    translations = {
        # Already done
        "Home": "home",
        "Categories": "categories",
        "Men's Fashion": "mensFashion",
        "Women's Fashion": "womensFashion",
        "Electronics": "electronics",
        "Jewelry": "jewelry",
        "Perfume": "perfume",
        "Blog": "blog",
        "Hot Deals": "hotDeals",
        "Hot Offers": "hotDeals",
        "Shirt": "shirt",
        "Shorts & Jeans": "shorts",
        "Safety Shoes": "safetyShoes",
        "Wallet": "wallet",
        "Dress": "dress",
        "Dress & Frock": "dress",
        "Earrings": "earrings",
        "Necklace": "necklace",
        "Watch": "watch",
        "Smart Watch": "smartWatch",
        "Sports": "sports",
        "Jacket": "jacket",
        "Sunglasses": "sunglasses",
        "Hat & Caps": "hat",
        "Belt": "belt",
        "New Products": "newProducts",
        "Trending": "trendingProducts",
        "Top Rated": "topRated",
        "Deal of the Day": "dealOfTheDay",
        "Best Sellers": "bestSellers",
        "Popular Categories": "popularCategories",
        "Products": "products",
        "Our Company": "ourCompany",
        "Services": "services",
        "Contact": "contact",
        "About Us": "aboutUs",
        "Delivery": "delivery",
        "Payment Method": "payment",
        "Terms and Conditions": "termsConditions",
        "Subscribe Newsletter": "subscribeNewsletter",
        "Subscribe": "subscribe",
        "Free Shipping": "freeShipping",
    }

    changes = 0

    # Add data-translate to text elements without it
    for text, key in translations.items():
        # Skip if already has data-translate
        patterns = [
            # Match <a>text</a> without data-translate
            (rf'(<a\s+(?:(?!data-translate)[^>])*>){re.escape(text)}(</a>)',
             rf'\1{text}\2',
             rf'\1{text}\2'),
            # Match <h2>text</h2> etc
            (rf'(<h[1-6]\s+(?:(?!data-translate)[^>])*>){re.escape(text)}(</h[1-6]>)',
             rf'\1{text}\2',
             rf'\1{text}\2'),
            # Match <p>text</p>
            (rf'(<p\s+(?:(?!data-translate)[^>])*>){re.escape(text)}(</p>)',
             rf'\1{text}\2',
             rf'\1{text}\2'),
        ]

        for pattern, _, _ in patterns:
            matches = re.finditer(pattern, html)
            for match in matches:
                if 'data-translate' not in match.group(0):
                    # Add data-translate attribute
                    old = match.group(0)
                    opening_tag = match.group(1)
                    # Insert data-translate before the >
                    new_opening = opening_tag.replace('>', f' data-translate="{key}">')
                    new = old.replace(opening_tag, new_opening)
                    html = html.replace(old, new, 1)
                    changes += 1

    # Write back
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)

    print(f"✅ Added {changes} data-translate attributes to {filename}")
    return changes

if __name__ == "__main__":
    add_translations_to_html('index.html')
