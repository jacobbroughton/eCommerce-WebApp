# eCommerce-WebApp
Created by Jacob Broughton


# Priotiry
- Figure out why dbUser does not fetch correctly after initial sign up

# The Plan
* Create basic server
* Get files/folder structured correctly
* Connect to heroku
* Add authentication via Auth0 & context
* Add basic site functionality
    * Profile, Home, Login, Logout
* Make / connect MySQL database... Tables:
    * Users (user_uid, email, nickname, first_name, last_name, town, state, country, date_created, time_created)
    * Listings (listing_uid, seller_uid, seller_nickname, title, description, price, category, ship_status, date_created, time_created)
    * More to come...
* Get users added to database after being authenticated
* Add profile edit section for adding extra info (name, town, state, etc.)
* Add listing functionality
    * Use same values as on listings DB table
* Make profile edit mandatory before creating a listing
    - Make it USA only and convert state input to a selection menu
* Get image preview working (client side)
* Upload image to database 
* Include and load images in listings
- Add categories section / page
- Design site mockup on affinity designer... Pages: 
    - Logged-Out Home
    - Logged-In Home
    - Profile
    - Categories List 
    - { Category }
    - Listing
- Set up stripe payment processor
    - Use stripe API quickstart guide