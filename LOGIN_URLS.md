# Login URLs for Each Role

## 🔐 Role-Specific Login URLs

Each role has their own dedicated login URL. **Only share the relevant URL with each role.**

---

## 👤 CLIENT LOGIN URL
**Give this URL to clients only:**
```
http://localhost:3000/auth/login/client
```

**After login, redirects to:**
```
http://localhost:3000/dashboard/client
```

---

## 🏢 WAREHOUSE LOGIN URL
**Give this URL to warehouse partners only:**
```
http://localhost:3000/auth/login/warehouse
```

**After login, redirects to:**
```
http://localhost:3000/dashboard/warehouse
```

---

## 👨‍💼 ADMIN LOGIN URL
**Give this URL to administrators only:**
```
http://localhost:3000/auth/login/admin
```

**After login, redirects to:**
```
http://localhost:3000/dashboard/admin
```

---

## Security Features

✅ **Role Isolation:** Each login page only allows access to its own dashboard
✅ **No Cross-Access:** Clients cannot access warehouse or admin dashboards
✅ **Automatic Redirects:** Wrong role attempts are redirected to correct login
✅ **No Login Selection:** Users cannot see other roles' login options

---

## How It Works

1. **Client** logs in at `/auth/login/client` → Goes to `/dashboard/client`
2. **Warehouse** logs in at `/auth/login/warehouse` → Goes to `/dashboard/warehouse`
3. **Admin** logs in at `/auth/login/admin` → Goes to `/dashboard/admin`

If a user tries to access a dashboard with the wrong role, they are automatically redirected to their correct login page.

