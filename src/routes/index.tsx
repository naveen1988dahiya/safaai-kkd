import { useEffect, useLayoutEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { clearToken, fetchSession, installStillValid, readBoot, signOut } from "@/lib/safai/api";
import { AdminLogin, InspectorLogin } from "@/components/safai/login";
import { InspectorApp } from "@/components/safai/inspector";
import { AdminApp, type Office } from "@/components/safai/admin";

export const Route = createFileRoute("/")({
  loader: () => readBoot(),
  component: Home,
});

type Gate = "admin" | "inspector";

function adminOffice(username: string): Office {
  return {
    role: "admin",
    name: "Admin",
    username,
    attendance: "edit",
    zone: "edit",
    number: "edit",
    staff: "edit",
    councillor: "edit",
    zones: [],
  };
}

function Home() {
  const boot = Route.useLoaderData();
  const [role, setRole] = useState<"admin" | "inspector" | "subadmin" | null>(boot.role);
  const [username, setUsername] = useState(boot.username);
  const [office, setOffice] = useState<Office | null>(boot.role === "admin" ? adminOffice(boot.username) : null);
  const [gate, setGate] = useState<Gate>("admin");
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [booting, setBooting] = useState(boot.role === "subadmin");

  useLayoutEffect(() => {
    const saved = localStorage.getItem("safai.lang");
    if (saved === "hi" || saved === "en") setLang(saved);
    const token = localStorage.getItem("safai.session");
    if (!token) {
      clearToken();
      setRole(null);
      setOffice(null);
      setGate("admin");
      setBooting(false);
      return;
    }
    const savedRole = localStorage.getItem("safai.role");
    if (savedRole === "admin" || savedRole === "inspector" || savedRole === "subadmin") {
      setRole(savedRole);
      const savedUser = localStorage.getItem("safai.user");
      if (savedUser) setUsername(savedUser);
      if (savedRole === "admin") setOffice(adminOffice(savedUser || "ADMIN"));
      if (savedRole === "subadmin") setBooting(true);
      document.cookie = `safai_role=${savedRole}; path=/; max-age=15552000; samesite=lax`;
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("safai.session");
    if (!token) {
      setBooting(false);
      return;
    }
    void installStillValid().then((state) => {
      if (state === "logout") {
        clearToken();
        void signOut();
        setRole(null);
        setOffice(null);
        setGate("admin");
        setBooting(false);
        return;
      }
      if (state === "none") {
        clearToken();
        setRole(null);
        setOffice(null);
        setGate("admin");
        return;
      }
      void fetchSession()
      .then((res) => {
        if (res.role === "admin") {
          setRole("admin");
          setUsername(res.username);
          setOffice(adminOffice(res.username));
          localStorage.setItem("safai.role", "admin");
          localStorage.setItem("safai.user", res.username);
          document.cookie = "safai_role=admin; path=/; max-age=15552000; samesite=lax";
        } else if (res.role === "subadmin") {
          setRole("subadmin");
          setUsername(res.username);
          setOffice({
            role: "subadmin",
            name: res.name,
            username: res.username,
            attendance: res.perms.attendance,
            zone: res.perms.zone,
            number: res.perms.number,
            staff: res.perms.staff,
            councillor: res.perms.councillor,
            zones: res.perms.zones,
          });
          localStorage.setItem("safai.role", "subadmin");
          localStorage.setItem("safai.user", res.username);
          document.cookie = "safai_role=subadmin; path=/; max-age=15552000; samesite=lax";
        } else if (res.role === "inspector") {
          setRole("inspector");
          localStorage.setItem("safai.role", "inspector");
          document.cookie = "safai_role=inspector; path=/; max-age=15552000; samesite=lax";
        } else {
          clearToken();
          setRole(null);
          setOffice(null);
          setGate("admin");
        }
        setBooting(false);
      })
      .catch(() => setBooting(false));
    });
  }, []);

  function chooseLang(next: "en" | "hi") {
    setLang(next);
    localStorage.setItem("safai.lang", next);
  }

  if (booting && (!role || (role === "subadmin" && !office))) {
    return (
      <main className="mx-auto grid min-h-dvh w-full max-w-[430px] place-items-center bg-canvas px-6 text-center">
        <div>
          <h1 className="text-3xl font-extrabold text-brand">सफाई निरीक्षण फॉर्म</h1>
          <p className="mt-1 text-base text-muted">नगरपालिका खरखौदा क्षेत्र</p>
        </div>
      </main>
    );
  }

  if (role === "inspector") {
    return (
      <InspectorApp
        onKicked={() => {
          clearToken();
          setRole(null);
          setGate("admin");
        }}
      />
    );
  }

  if (role === "admin" || (role === "subadmin" && office)) {
    return (
      <AdminApp
        lang={lang}
        username={username}
        office={office ?? adminOffice(username)}
        onLang={chooseLang}
        onLogout={() => {
          setRole(null);
          setOffice(null);
          setGate("admin");
        }}
      />
    );
  }

  if (gate === "inspector") {
    return <InspectorLogin onBack={() => setGate("admin")} onSuccess={() => setRole("inspector")} />;
  }

  return (
    <AdminLogin
      lang={lang}
      onLang={chooseLang}
      onInspector={() => setGate("inspector")}
      onSuccess={(session) => {
        setUsername(session.username);
        if (session.role === "subadmin" && session.perms) {
          setOffice({
            role: "subadmin",
            name: session.name || session.username,
            username: session.username,
            ...session.perms,
          });
          setRole("subadmin");
          return;
        }
        setOffice(adminOffice(session.username));
        setRole("admin");
      }}
    />
  );
}