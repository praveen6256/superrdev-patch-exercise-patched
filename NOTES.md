# Patch Notes

## Summary of changes

- Fixed task-search filtering so `archived = FALSE` and the optional status filter apply to both title and description matches. The same precedence fix was applied to the H2 query reference and Oracle reference artifact.
- Added API validation for `page`/`pageSize` and return `400 Bad Request` for unsupported status values instead of allowing invalid input to cause server errors.
- Removed the artificial `Thread.sleep()` based on search length. It added avoidable latency to every request, especially empty/short searches.
- Improved the React search flow with a short debounce and `AbortController`, preventing unnecessary requests and stale responses from overwriting newer results.
- Reset pagination to page 1 when the search term or status filter changes.
- Fixed frontend error/loading handling so errors do not leave the UI stuck in a loading state.

## What I chose not to change

I did not rewrite the repository into database-level pagination, add authentication, or upgrade framework/dependency versions. Those are worthwhile production improvements, but they are larger changes than necessary for this timeboxed exercise.

## Biggest remaining risk

The backend still loads all matching tasks into memory and paginates with `subList`. That is acceptable for this small sample but will not scale well with a large task table. A database-level `Pageable` query with a count query would be the next improvement.

## Tools / AI

I used ChatGPT to review the React, Spring Boot, H2 SQL, and Oracle reference code, identify likely failure paths, and draft the focused changes. I reviewed each change against the existing data flow and kept the implementation small rather than accepting a broad rewrite.
