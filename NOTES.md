## System Design Steps

we don't have to follow these steps exactly, it can varies depends on many factor but this can be used as a reference

## Functional Requirements

1. given a user location in a search radius as inputs, return all businesses within the search radius

2. business owners can add, delete, update business (changes doesn't need to be applied in real-time)

3. users can view can view detailed info about a business

## Non-Functional Requirements

- assume app has 100Mil DAU, and 200Mil businesses (so latency should be low)

- users should be able to find nearby businesses quickly

- service should be highly available to handle traffic spikes during peak hours

## Back-of-envelope calculations

- 100Mil DAU, 200Mil Businesses

- assuming how many search queries DAU does, lets say 5 per day

- search qps = 100Mil\* 5 / 100,000= 5000

- storage to hold 200Mil businesses, 200*10^6 * 10^3 (kb)= 2 \* 10 ^ 11 =200GB

- storage for geospatial_index table -> 2*10^8 * 24= 5GB

## High level design

including api design, data schema, high level design diagram

- API design

1. GET /v1/search/nearby -> takes latitude, longitude of user location and optional radius (default 5km) and return arrays of businesses ( we can add pagination, each business contains brief info only)

2. GET /v1/businesses/:id -> details of business

3. POST /v1/businesses -> add business

4. PUT /v1/businesses/:id -> update business

5. DELETE /v1/businesses/:id -> delete business

- Data Schema

1. business table -> holds information about table including id pk, longitude and latitude

2. geospatial_index -> contain location, business id and its mainly used by the search API

- design diagram existis in screenshot, NOTE each service is stateless behind the load balancer

- location based service characteristics (search api)

1.  it is read heavy with no write requests at all
2.  high QPS ( estimation 5000)
3.  its stateless service which mean it can be scaled horizontally easily

- business service manages cruds

1. QPS is not high, but could be high during peak hours
2. changes effect doesn't have to take effect right away
3. data doesn't change frequently so its a good candidate for caching

- based on access pattern read/write query, it can be used to define the toplogy of the database cluster

- Conclusions

1. system is read heavy read QPS is higher than write
2. write doesn't need to take effect immediately

- NOTE having a service that uses write and other not, we can use cluster with primary-secondary setup, primary handles write and replicas handle heavy reads (there could be inconsistency caused by replication delay but as we said changes doesn't have to take effect imemdiately)

## More Details

- we need to use a db that is optimized for searching, sorting and querying data in geometric space examples (redis GeoHash, Postgres PostGIS extension)

- longitude and latitude can be stored in geospatial_index to get how far the user is from business and have ability to rank them

- using geospatial indexes can be good in this case, but NOTE many businesses would share the same geohash. geohash and business id can form a compound key

- we may use like operator in SQL to do the search -> SELECT business_id FROM geospatial_index WHERE geohash LIKE '9q8zn%'

- entire data set of the geospatial_index can fit into a single db 200MIL\*30bytes=6GB, so we can use replication as there is no strong reason to use sharding which is more complicated

- if read performance is a bottleneck we can add more read replicas

- for business table it have 200GB of data which is quite huge, so we can use sharding for it, it has low update rate, ready heavy, NOTE we can get away from sharding by putting cache layer in front of it

- adding some monitoring and telemetry to capture performance issues and bottlenecks, + load test, iterate, ship first with minimal requirements then scale

## Extra

we should know or have an idea on how the geospatial indexes works

- one way is to draw a circle and find all businesses within the circle, but this might not be efficent

- we could use indices on longitude and latitude columns, but won't do much, as we will need to find intersection between ranges, NOTE index can improve only search speed in one direction

- IMPORTANT we can map two-dimensional data into one, so we can build single index on it example hash based like even grid - geohash - cartesian tiers, second approach is tree based like quadtree, google S2 and RTree

- hash based index, divide world into smaller grids, grid can have many businesses, but the problem with it is distribution of businesses will be uneven, ideally we want granular grids for dense areas and larger one for sparse

- geohash (improvement to even grids): reduces two-dimensional location data into one string, divides world first into 4 quardants represented by 2 bits and keep dividing grid into smaller represented by another 2 bits, and so on till it reach the desired size, NOTE it can be good as it uses string which can be used by any database, to fix some issues like neighbors with completly differnt hashes or neighbour with same long prefix, is getting data from current grid and its 8 neighbours

- NOTE geospatial index is supported in most common dbs like mongo and postgres
