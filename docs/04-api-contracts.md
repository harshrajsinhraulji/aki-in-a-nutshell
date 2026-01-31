# API Contract Document

> Complete API endpoint specifications for Aki's World.

---

## Base Configuration

**Base URL:** `/api`  
**Content-Type:** `application/json`  
**Authentication:** Cookie-based session for admin routes

---

## Public Endpoints

### GET `/api/public/plushies`

Returns all public plushies in display order.

**Request:** No parameters

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-1",
      "name": "Mochi",
      "imageUrl": "https://storage.../mochi.webp",
      "description": "Found her at a midnight market in Colombo...",
      "tags": ["pink", "bear", "first-plushie"],
      "dateAdded": "2023-05-14T00:00:00Z",
      "order": 1
    }
  ],
  "total": 5
}
```

---

### GET `/api/public/plushies/:id`

Returns a single plushie with full details.

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| id | UUID | Plushie ID |

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-1",
    "name": "Mochi",
    "imageUrl": "https://storage.../mochi.webp",
    "description": "Full acquisition story...",
    "tags": ["pink", "bear", "first-plushie"],
    "moodLog": [
      { "date": "2023-05-14", "emoji": "🥰", "note": "Just brought her home!" },
      { "date": "2023-06-01", "emoji": "😴", "note": "Best nap buddy" }
    ],
    "dateAdded": "2023-05-14T00:00:00Z"
  }
}
```

**Error (404):**
```json
{
  "success": false,
  "error": "Plushie not found"
}
```

---

### GET `/api/public/confessions`

Returns paginated approved confessions.

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 20 | Items per page (max 50) |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-c1",
      "bodyText": "I still sleep with my childhood blanket...",
      "imageUrl": null,
      "reactions": { "lol": 12, "same": 45, "yikes": 2 },
      "createdAt": "2024-01-15T03:14:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 142,
    "totalPages": 8
  }
}
```

---

### POST `/api/confessions`

Submit a new confession. Subject to moderation.

**Request Body:**
```json
{
  "bodyText": "Max 500 characters of confession text...",
  "imageUrl": "https://storage.../optional-image.webp",
  "isAnonymous": true,
  "consentGiven": true
}
```

**Validation Rules:**
| Field | Rule |
|-------|------|
| bodyText | Required, 10-500 characters |
| imageUrl | Optional, valid URL |
| isAnonymous | Optional, defaults true |
| consentGiven | Required, must be true |

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-new",
    "status": "pending",
    "message": "Your confession is being reviewed."
  }
}
```

**Response (Flagged - Self-Harm):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-new",
    "status": "pending",
    "flagged": true,
    "showHelpline": true,
    "message": "Your confession has been saved for review."
  }
}
```

The client MUST show the helpline overlay when `showHelpline: true`.

---

### POST `/api/confessions/:id/react`

Add a reaction to a confession.

**Request Body:**
```json
{
  "reaction": "lol" | "same" | "yikes"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "reactions": { "lol": 13, "same": 45, "yikes": 2 }
  }
}
```

---

### POST `/api/confessions/:id/report`

Report a confession for review.

**Request Body:**
```json
{
  "reason": "inappropriate" | "spam" | "harmful"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Report submitted. Thank you."
}
```

---

### GET `/api/public/stories`

Returns published stories.

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 12 | Items per page |
| tag | string | null | Filter by tag |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-s1",
      "title": "3am in Kandy",
      "slug": "3am-in-kandy",
      "excerpt": "The temple bells wouldn't stop...",
      "coverImageUrl": "https://storage.../kandy-cover.webp",
      "tags": ["travel", "sri-lanka", "temples"],
      "publishedAt": "2024-01-10T00:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

---

### GET `/api/public/stories/:slug`

Returns a full story by slug.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-s1",
    "title": "3am in Kandy",
    "slug": "3am-in-kandy",
    "bodyMarkdown": "# Full markdown content...",
    "coverImageUrl": "...",
    "galleryUrls": ["...", "..."],
    "tags": ["travel", "sri-lanka"],
    "publishedAt": "2024-01-10T00:00:00Z",
    "relatedStories": [
      { "slug": "colombo-nights", "title": "Colombo Nights", "coverImageUrl": "..." }
    ]
  }
}
```

---

### GET `/api/public/songs`

Returns the public playlist.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-song1",
      "title": "Late Night Thoughts",
      "artist": "Aki's Playlist",
      "fileUrl": "https://storage.../track1.mp3",
      "coverImageUrl": "https://storage.../cover1.webp",
      "durationSeconds": 245,
      "order": 1
    }
  ],
  "total": 3
}
```

---

### GET `/api/public/socials`

Returns social links.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "platformName": "instagram",
      "handle": "@aki",
      "url": "https://instagram.com/aki"
    },
    {
      "platformName": "discord",
      "handle": "aki.in.a.nutshell",
      "url": "https://discord.gg/..."
    }
  ]
}
```

---

## Admin Endpoints

All admin endpoints require valid session cookie.

### POST `/api/admin/login`

Authenticate as admin.

**Request Body:**
```json
{
  "password": "secret-password"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Logged in successfully"
}
```
Sets `aki-admin-session` cookie.

**Response (Failure):**
```json
{
  "success": false,
  "error": "Invalid password"
}
```

---

### POST `/api/admin/logout`

End admin session.

**Response:**
```json
{
  "success": true,
  "message": "Logged out"
}
```
Clears session cookie.

---

### Plushie Management

#### POST `/api/admin/plushies`

Create a new plushie.

**Request Body:**
```json
{
  "name": "Bubble",
  "imageUrl": "https://storage.../bubble.webp",
  "description": "A tiny whale from the airport gift shop...",
  "tags": ["whale", "blue", "travel"],
  "moodLog": [
    { "date": "2024-01-01", "emoji": "🐋", "note": "First day home!" }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": { "id": "uuid-new", ... }
}
```

---

#### PUT `/api/admin/plushies/:id`

Update a plushie.

**Request Body:** (partial updates allowed)
```json
{
  "name": "Updated Name",
  "moodLog": [ ... ] // Replaces entire mood log
}
```

---

#### DELETE `/api/admin/plushies/:id`

Delete a plushie.

**Response:**
```json
{
  "success": true,
  "message": "Plushie deleted"
}
```

---

#### PUT `/api/admin/plushies/reorder`

Update display order.

**Request Body:**
```json
{
  "order": ["uuid-1", "uuid-3", "uuid-2"]
}
```

---

### Confession Moderation

#### GET `/api/admin/confessions`

Get confessions for moderation.

**Query Parameters:**
| Param | Type | Default |
|-------|------|---------|
| status | string | pending |
| page | number | 1 |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-c1",
      "bodyText": "...",
      "imageUrl": null,
      "status": "pending",
      "flagReason": "self_harm",
      "reportsCount": 0,
      "createdAt": "..."
    }
  ],
  "counts": {
    "pending": 5,
    "approved": 142,
    "rejected": 3
  }
}
```

---

#### PUT `/api/admin/confessions/:id/approve`

Approve a confession.

**Request Body:** (optional)
```json
{
  "moderatorNote": "Reviewed and approved"
}
```

---

#### PUT `/api/admin/confessions/:id/reject`

Reject a confession.

**Request Body:**
```json
{
  "moderatorNote": "Reason for rejection"
}
```

---

### Song Management

#### POST `/api/admin/songs`

Add a new song.

**Request Body:**
```json
{
  "title": "Midnight Drive",
  "artist": "Unknown",
  "fileUrl": "https://storage.../track.mp3",
  "coverImageUrl": "https://storage.../cover.webp",
  "durationSeconds": 312
}
```

---

#### PUT `/api/admin/songs/:id`

Update song metadata.

---

#### DELETE `/api/admin/songs/:id`

Delete a song.

---

#### PUT `/api/admin/songs/reorder`

Update playlist order.

**Request Body:**
```json
{
  "order": ["uuid-s1", "uuid-s3", "uuid-s2"]
}
```

---

### Story Management

#### POST `/api/admin/stories`

Create a new story.

**Request Body:**
```json
{
  "title": "New Story",
  "slug": "new-story",
  "excerpt": "Short preview...",
  "bodyMarkdown": "# Full content...",
  "coverImageUrl": "...",
  "tags": ["travel"],
  "isDraft": true
}
```

---

#### PUT `/api/admin/stories/:id`

Update a story.

---

#### PUT `/api/admin/stories/:id/publish`

Publish a draft story.

---

#### DELETE `/api/admin/stories/:id`

Delete a story.

---

### File Upload

#### POST `/api/admin/upload`

Get a signed upload URL.

**Request Body:**
```json
{
  "bucket": "plushies",
  "fileName": "new-plushie.webp",
  "contentType": "image/webp"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "signedUrl": "https://storage.../upload?...",
    "publicUrl": "https://storage.../plushies/new-plushie.webp"
  }
}
```

Client uploads directly to signedUrl, then uses publicUrl in subsequent API calls.

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Human-readable error message",
  "code": "ERROR_CODE" // Optional machine-readable code
}
```

**Common HTTP Status Codes:**
| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation) |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Rate Limited |
| 500 | Server Error |

---

## Rate Limiting

| Endpoint Type | Limit |
|---------------|-------|
| Public reads | 100/min |
| Confession submit | 5/min |
| Reactions | 30/min |
| Admin operations | 60/min |
