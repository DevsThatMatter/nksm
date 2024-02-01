'use client';

import { Card, CardContent, CardHeader } from "../ui/card";
import Header from "./header";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: string;
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
}: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header headerLabel={headerLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}