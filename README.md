# REST-API

# Installation

After cloning the repo, run `npm install` to install the following dependancies

```
express
mongoose
jsonwebtoken
dotenv
cors
bcryptjs
```

Then create a `.env` file in the root folder which will contain the following:

```
    MONGO_URI = {A connection string to the font of all (relevant) knowledge}
    SECRET_KEY = {A phrase that you shall not reveal to the world, for it risks the integrity of everything}
```

### Routes

#### User

- `/user`
  - `POST`: Used for signing up to the website, uses regex to verify the email conforms to typical format, and BCryptJS to encrypt the password before storing in a Mongo Database.
  - `GET`: Used to list the users in the database
  - `/user/:username`: Used to list a specific users details
  - `PATCH`: Used to add addresses onto a users account.
- `/login`
  - `POST`: Used to log in to your account, and grants a JSON Web Token for future logins.
  - `GET`: Used to check for JSON Web Token, and decrypting it for logging in.
- `/change-password`:
  - `PUT`: Used to change password, accepts current password, and two instances of the new password to ensure it is typed correctly.
- `/delete-account`:
  - `DELETE`: Decrypts the JSON Web Token, and if it is valid, allows the user to delete their account

#### Listings

- `/sell`
  - `POST`: Used to create a new item auction on the website.
- `/shop`
  - `GET`: Used to list the auctions, allows for certain criteria to be set
- `/edit`
  - `PATCH`: Used to update various values in auction listings

#### Deliveries

- `/delivery`
  - `POST`: Used to create a new delivery record
  - `GET` `delivery/:name`: Used to get the details of a delivery by name.
  - `DELETE`: Used to delete a delivery.
  - `PATCH`: Used to update delivery information.
- `/deliveries`
  - `GET`: Used to find multiple deliveries.
