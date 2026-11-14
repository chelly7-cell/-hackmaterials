
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { themes } from "@/lib/catalog";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[char];
  });
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !adminEmail || !fromEmail) {
      return NextResponse.json(
        { error: "Configuration email manquante sur le serveur." },
        { status: 500 }
      );
    }

    const body = await request.json();

    const {
      themeId,
      materialIds,
      teamName,
      leaderName,
      email,
    } = body;

    if (
      typeof themeId !== "string" ||
      !Array.isArray(materialIds) ||
      materialIds.length !== 5 ||
      !materialIds.every((id) => typeof id === "string") ||
      new Set(materialIds).size !== 5 ||
      typeof teamName !== "string" ||
      typeof leaderName !== "string" ||
      typeof email !== "string"
    ) {
      return NextResponse.json(
        { error: "Données invalides. Vérifiez votre demande." },
        { status: 400 }
      );
    }

    if (
      !teamName.trim() ||
      !leaderName.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      teamName.length > 100 ||
      leaderName.length > 100 ||
      email.length > 254
    ) {
      return NextResponse.json(
        { error: "Veuillez vérifier vos informations." },
        { status: 400 }
      );
    }

    const theme = themes.find((item) => item.id === themeId);

    if (!theme) {
      return NextResponse.json(
        { error: "Thème invalide." },
        { status: 400 }
      );
    }

    const materials = materialIds.map((id: string) =>
      theme.materials.find((item) => item.id === id)
    );

    if (materials.some((item) => !item)) {
      return NextResponse.json(
        { error: "Matériel invalide pour ce thème." },
        { status: 400 }
      );
    }

    const safeTeam = escapeHtml(teamName.trim());
    const safeLeader = escapeHtml(leaderName.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeTheme = escapeHtml(theme.name);

    const materialList = materials
      .map((item) => `<li>${escapeHtml(item!.name)}</li>`)
      .join("");

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      replyTo: email.trim(),
      subject: `Nouvelle demande Hackathon - ${teamName.trim()}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#172033">
          <h2>Nouvelle demande de matériel</h2>
          <p><strong>Équipe :</strong> ${safeTeam}</p>
          <p><strong>Responsable :</strong> ${safeLeader}</p>
          <p><strong>Email :</strong> ${safeEmail}</p>
          <p><strong>Thème :</strong> ${safeTheme}</p>
          <h3>Matériels sélectionnés</h3>
          <ol>${materialList}</ol>
          <hr />
          <p>Demande reçue depuis la plateforme Hackathon.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        { error: "L'envoi de l'email a échoué. Réessayez." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Demande envoyée avec succès.",
    });
  } catch (error) {
    console.error("Submission error:", error);

    return NextResponse.json(
      { error: "Une erreur est survenue. Réessayez." },
      { status: 500 }
    );
  }
}
