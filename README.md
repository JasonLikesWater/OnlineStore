# Online Store Back_End_C

## Prerequisites

\*\* Must have correct SSMS configuration and sql insert and create queries must be run before starting

How To run the website

be in the `Back_End_C` directory

ensure you have .NET SDK 8.0 or higher installed

```bash
dotnet --version
```

install dependencies with:

```bash
dotnet restore
```

### environment variables (.env)

create a `.env` file in the root of `Back_End_C`
with your JWT secret key (can be anything greater than 256 bits)

```env
JWT_KEY = ANYTHINGCANGOHERE123123123123123
```

## To run server

be in the `Back_End_C` directory and run:

```bash
dotnet build
dotnet run
```

Then open a seperate terminal and get into the Front_End\onlineStoreReact directory. Once in said directory run the following commands.

```bash
npm install
npm run dev
```
After running that command the terminal should display a local url. Press ctrl and click the url to open the website.

To test the login and accounts use the following: 
Email: johnseena@gmail.com
Password: hash1

# OnlineStore Unit Tests

Movies Controller - 6 tests
Sales Controller - 5 tests
Users Controller - 5 tests
Total - 16 tests

# How to run the tests
From the `Back_End_C` folder:
```bash
dotnet test OnlineStore.sln
```
Or 

from the test project folder:
```bash
cd Tests/OnlineStore.Tests
dotnet test
```
