## data filtering

```js
@tracked mapData = this.model;

filterBy(filters) {
  console.log(this.mapData.length);

  const newMapData = this.mapData.filter((data) => {
    return data.type == filters[0];
  });
  this.mapData = newMapData;
  console.log(filters, this.mapData.length);
}
```