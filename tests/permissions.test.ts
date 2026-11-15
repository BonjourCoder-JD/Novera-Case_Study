import { describe, expect, it } from "vitest"
import { canAccess, type User } from "../src/permissions.js"

describe("Role-based authorization", () => {
  const owner: User = {
    id: "owner-1",
    role: "owner",
    active: true,
    permissions: [],
  }

  it("allows an active owner", () => {
    expect(canAccess(owner, "settings:read")).toBe(true)
  })

  it("denies an inactive owner", () => {
    expect(
      canAccess({ ...owner, active: false }, "settings:read")
    ).toBe(false)
  })

  it("allows staff with explicit permission", () => {
    expect(
      canAccess({
        id: "staff-1",
        role: "staff",
        active: true,
        permissions: ["projects:read"],
      }, "projects:read")
    ).toBe(true)
  })

  it("denies staff without permission", () => {
    expect(
      canAccess({
        id: "staff-1",
        role: "staff",
        active: true,
        permissions: [],
      }, "settings:read")
    ).toBe(false)
  })

  it("denies client access to protected operations", () => {
    expect(
      canAccess({
        id: "client-1",
        role: "client",
        active: true,
        permissions: ["projects:write"],
      }, "projects:write")
    ).toBe(false)
  })
})
