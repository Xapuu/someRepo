# REACT DOCS

## xFetcheer
* We use xFetcher so that we can intercept all request and apply some data

<!-->TODO explain why there is path manager (because there will be dev build and app build)<-->
## We use constants so that we can do some magick

# API docs
## Login register authorization
* Register requires **POST** request on path ```/register``` holding the following data in it's body
```
{
    username:string,
    password:string,
    confirmPassword:string
}
```