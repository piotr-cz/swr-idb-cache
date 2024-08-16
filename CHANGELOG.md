# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2024-08-16

### Added

- Support for idb v8

### Changed

- Switch build target to ES2018 (same as SWR uses)
- Use separate types for commonjs

## [1.0.3] - 2024-04-22

### Fixed

- Typescript import error [#16](https://github.com/piotr-cz/swr-idb-cache/pull/16)

## [1.0.2] - 2024-03-09

### Fixed

- Catch IndexedDB errors [#13](https://github.com/piotr-cz/swr-idb-cache/pull/13)

## [1.0.1] - 2023-06-06

### Changed

- Do not recreate cache provider on config options change [#10](https://github.com/piotr-cz/swr-idb-cache/pull/10)

### Fixed

- Handle errors while initializing idb [#9](https://github.com/piotr-cz/swr-idb-cache/pull/9)

## [1.0.0] - 2022-12-30

### Added

- Publish stable release to match SWR v2 stable release

## [1.0.0-rc.3] - 2022-11-23

### Changed

- BREAKING: Removed types prefix (ie. IStorageHandler -> StorageHandler)
- BREAKING: Requires SWR 2.0.0-rc.0

## [1.0.0-rc.2] - 2022-10-19

### Changed

- BREAKING: IStorageHandler signature to use initialize and upgrade methods

### Fixed

- Export IStorageHandler interface

## [1.0.0-rc.1] - 2022-10-12

### Added

- Initial release

[Unreleased]: https://github.com/piotr-cz/swr-idb-cache/compare/v1.0.3...HEAD
[1.0.3]: https://github.com/piotr-cz/swr-idb-cache/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/piotr-cz/swr-idb-cache/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/piotr-cz/swr-idb-cache/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/piotr-cz/swr-idb-cache/compare/v1.0.0-rc.3...v1.0.0
[1.0.0-rc.3]: https://github.com/piotr-cz/swr-idb-cache/compare/v1.0.0-rc.2...v1.0.0-rc.3
[1.0.0-rc.2]: https://github.com/piotr-cz/swr-idb-cache/compare/v1.0.0-rc.1...v1.0.0-rc.2
[1.0.0-rc.1]: https://github.com/piotr-cz/swr-idb-cache/releases/tag/v1.0.0-rc.1
