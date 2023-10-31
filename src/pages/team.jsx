import { useTranslation } from "next-i18next";
import TeamCard from "@/components/Cards/TeamCard";
import Layout from "@/layout/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { members } from "@/util/library";

function Team() {
    const router = useRouter();
    const language = router.locale;
    const { t } = useTranslation("common");

    useEffect(() => {
        document.body.dir = language == "ar" ? "rtl" : "ltr";
    }, [language]);

    return (
        <Layout>
            <div className='max-w-5xl px-4 mx-auto'>
                <h1 className='my-16 text-5xl font-bold text-center'>
                    {t("team.title")}
                </h1>

                {/* <div className="flex flex-wrap justify-center gap-4 mb-8"> */}

                <div className='grid mx-auto sm:justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 justify-items-center'>
                    {members.map((member) => (
                        <TeamCard
                            key={member.id}
                            name={
                                language === "en"
                                    ? member.name_en
                                    : member.name_ar
                            }
                            role={
                                language === "en"
                                    ? member.role_en
                                    : member.role_ar
                            }
                            imgUrl={member.imgUrl}
                            github={member.github}
                            linkedIn={member.linkedIn}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Team;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}
