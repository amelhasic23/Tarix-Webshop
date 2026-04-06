#!/usr/bin/env python3
"""
Script to add data-translate attributes to HTML file for comprehensive localization
"""

import re

# Read the HTML file
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Define translation mappings (text -> translation key)
translations = {
    "Men's Fashion": "mensFashion",
    "Women's Fashion": "womensFashion",
    "Electronics": "electronics",
    "Jewelry": "jewelry",
    "Perfume": "perfume",
    "Blog": "blog",
    "Hot Deals": "hotDeals",
    "Shirt": "shirt",
    "Shorts": "shorts",
    "Safety Shoes": "safetyShoes",
    "Wallet": "wallet",
    "Dress": "dress",
    "Earrings": "earrings",
    "Necklace": "necklace",
    "Watch": "watch",
    "Smart Watch": "smartWatch",
    "Sports": "sports",
    "Jacket": "jacket",
    "Sunglasses": "sunglasses",
    "Hat & Caps": "hat",
    "Belt": "belt",
    "Top Rated": "topRated",
    "Deal of the Day": "dealOfTheDay",
    "Best Sellers": "bestSellers",
    "Shop Now": "shopNow",
    "View All": "viewAll",
    "Popular Categories": "popularCategories",
    "Products": "products",
    "Our Company": "ourCompany",
    "Services": "services",
    "Contact": "contact",
    "About Us": "aboutUs",
    "Delivery": "delivery",
    "Payment Method": "payment",
    "Return Policy": "returns",
    "Terms & Conditions": "termsConditions",
    "Privacy Policy": "privacyPolicy",
}

# Add data-translate attributes
for text, key in translations.items():
    # Match anchor tags and other text elements
    patterns = [
        (f'<a([^>]*)>{text}</a>', f'<a\\1 data-translate="{key}">{text}</a>'),
        (f'<h2([^>]*)>{text}</h2>', f'<h2\\1 data-translate="{key}">{text}</h2>'),
        (f'<h3([^>]*)>{text}</h3>', f'<h3\\1 data-translate="{key}">{text}</h3>'),
        (f'<li([^>]*)>{text}</li>', f'<li\\1 data-translate="{key}">{text}</li>'),
        (f'<button([^>]*)>{text}</button>', f'<button\\1 data-translate="{key}">{text}</button>'),
    ]

    for pattern, replacement in patterns:
        html = re.sub(pattern, replacement, html)

# Update search placeholder
html = html.replace(
    'placeholder="Search products..."',
    'placeholder="Search products..." data-translate-placeholder="searchProducts"'
)

# Write the updated HTML
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("✅ Translation attributes added successfully!")
print(f"📝 Total replacements made")
