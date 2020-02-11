# This is a log

## [Unreleased]

## [1.0.1] - 2019-12-13

### Added

-NPC: PATCH keyword unit test (PATCH for keyword does work)
-NPC Object [name, description, health, passives]
-NPC Routes
-POST
-GET, GET /:id
-PATCH any NPC fields

### Changed

-NPC GET routes now populate the actual names of the keywords
-NPC Object now creates a random human name one is not specified

## [1.0.0] - 2019-12-10

### Added

-Keyword Schema
-GET, GET/:id, POST for Keyword Schema

- Keyword Object [Semantically Keyword == Thematic keyword, all others are xxxKeyword]
  -id number
  -keyword as string

- Keyword Routes
  -GET all associated assets
  -GET keyword by ID
  -POST keywords

### Fixed

-Dependencies updated to pass Travis

### Deleted
