This is an ecommerce site, where you can buy all sorts of ascii faces like `(ノ・∀・)ノ` and `¯_(ツ)_/¯`, in a wide variety of font sizes. The homepage should display a list of products for people to browse.

## Features

Installation
$ npm install

Running the App
$ npm start
This will start the app using webpack-dev-server on http://localhost:3001.It will also start the REST-API server using json-server, by default on http://localhost:3000

Features

products are displayed in a grid.
the user has an option to sort the products in ascending order. Can sort by "size", "price" or "id".

each product has:
a "size" field, which is the font-size (in pixels).
a "price" field, in cents. Formatted as dollars like $3.51.
a "date" field, which is the date the product was added to the catalog. Dates are displayed in relative time (eg. "3 days ago") unless they are older than 1 week, in which case the full date is displayed.
the product grid automatically load more items as you scroll down.
an animated "loading..." message is shown while the user waits for the data to load.
to improve the user's experience, the app always pre-emptively fetch the next batch of results in advance, making use of idle-time. But they still are not displayed until the user has scrolled to the bottom of the product grid.
when the user reaches the end and there are no more products to display, the message "~ end of catalogue ~" is shown.

Ads features
after every 20 products an advertisement is inserted from one of our sponsors. The same advertisement markup shown in the header of given public/index.html is used, but randomly generating the ?r query param each time an ad is displayed.
ads is randomly selected, and a user must never see the same ad twice in a row.
