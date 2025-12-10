# Online Store Back_End_C

## Prerequisites

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