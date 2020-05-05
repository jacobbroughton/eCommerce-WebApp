# eCommerce-WebApp
Created by Jacob Broughton


# Bug Report
- Sometimes or initial listings show twice on profile.

# Completed
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
* Design site mockup on affinity designer... Pages: 
    - Logged-Out Home
    - Logged-In Home
    - Profile
    - Categories List 
    - { Category }
    - Listing
* Get image preview working (client side)
* Upload image to database 
* Include and load images in listings
* Work on styles
* Add statusUrl to context
* Create "Browse" page
* Add category filter
    * Consider using props from parent category/browse element
* Adjust styling on sell page so the image does not take up so much space.
* Let users add up to 4 images
    * Use multer array (i think)
    * Consider appending image url strings with a comma in database field (up to 4)
* Add "Firmness ()" "Trade" field to product listing
* Create single listing modals / pages
* Finish first draft for single listing
* Load all images on single listing view
    * Split image string
    * Only load first on listings page
* Let users save listings
* Fix unsave issue
    * Unsave SOMETIMES doesn't work
    * Need to consider when user is trying to delete last one in string without a comma after it.
* Fix photos not being found issue
    * Multer is uploading the file locally, but the string is not being sent to the database.
    * Empty image request body too
    * Works occasionally, both arrays and singles
    * Some images are getting "null" as their source
* After posting a listing, make modal with link to profile with product pulled up
* Fix duplicate listings / SQL rows issue
    * Images occasionally on duplicate also
* Optimize images
    * Use sharp NPM or something similar
* Make 'load more' functionality, maybe 20 - 30 per load
* Give "load more" button some style
* Make product listing grid more dynamic
    * Add / remove columns
* Make categories searchable / link correctly 
* Fix close modal button bug (Opens single page)
* Add "automotive parts", "tools" categories
* Let users delete saved listings
* Add share button
* Hide "Load More" button when there is no more to show
* Add delete button for each listing

# Incomplete
- Add tags in each listing (for search)
- Add search functionality
- Adjust profile page style / functionality
    - Add a sold section
- Add notifications
    - Use web-sockets
- Turn scroll events off for listings page when modal is opened
- Make page load at top when switching categories
- Let users edit their profile info, and add new info
- Adjust image resize
- Add filtering
    - By state / town / price
    - Sort by price
- Let sellers create "stores"
- Make picture full screen on click
- Condense repeated code in a more sensable / scalable wayß
- Polish styles
- Split up components into more consise, smaller, reusable components
- Make all selling fields required
    - Cannot be the "select" option
- Add loading for when images are loading on pages
- Add state / city filters
- Add "wanted" section
- Add dark mode
    - Consider using context api and styled components for dynamic styling
- Consider utilizing cookies for temporary buyers accounts, or something else

# Break up components
