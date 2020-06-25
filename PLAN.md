# Bug Report
- 

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
    * Make it USA only and convert state input to a selection menu
* Design site mockup on affinity designer... Pages: 
    * Logged-Out Home
    * Logged-In Home
    * Profile
    * Categories List 
    * { Category }
    * Listing
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
* Add tags in each listing (for search)
* Add loading for when images are loading on pages
* Make page load at top when switching categories
* Add search functionality
* Adjust profile page style / functionality
    * Add a sold section
* Add 'contact' button on each that allows users to email seller
* Make the grid more modular
* Make client-side status URL
* Improve modularity for the components
* Make separate pages for showing only/all saved or active listings 
* Make 'Load more' work correctly from searched results
* Change statusUrl to clientUrl and serverUrl
* Turn scroll events off for listings page when modal is opened
* Limit search results just like in categories
    * Return to search page
* Reflect search bar value instead of category
* Convert complex state management with useReducer
    * Auth0 context
    * Anything that deals with an object or array
* Move axios calls to separate page 
* Fix repeated refreshes on home and profile page
* Adjust components
    * Work from parent component to child
* Split up components into more consise, smaller, reusable components

# Feature Ideas
- Dark Mode
- Trust factors (ex. eBay, pinkbike)


# Incomplete
- Focus on security & make trust factors paramount
- Add watchlist area
    - Able to add and remove items EASILY
    - 'Notify' / Show users that the status of the item has changed
- Make 'overlay' it's own component
- Add sorting + filtering (state / town / price / etc)
- Let users add more info about themselves (bio, images, etc)
- Add 'view all in category' when on a single listing view.
- Clean up CSS files, employ DRY method
- Add notifications
- Let users edit their profile info, and add new info
- Adjust image resize
- Let users choose their grid layout
- Let sellers create "stores"
- Make picture full screen on click
- Make all selling fields required.
- Add services section.
- Bidding system for promoted adverts
- Add "As of 3:45pm 3/4/20" next to the sold status on listing
    - Update whenever the user has checked the site again
- Consider utilizing cookies for temporary buyers accounts, or something else.
- Add menu/options on rightclick of mouse (ex. Spotify).
- Add reporting system
- Add "similar" section for each listing, maybe 3 or 4..
- Change how search parameters work (include title + filters + tags)
- Add pages indicator (shows the page that you're on)
    - Put it on top and bottom
- Add "2 Items for Sale / 4 Items Sold" indicator for users