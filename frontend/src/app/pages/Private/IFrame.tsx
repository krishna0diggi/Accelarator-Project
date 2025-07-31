import React from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Card, CardContent, CardHeader, CardActions, Typography, Button, Divider } from "@mui/material";
// import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ExternalLink, Presentation, Video } from 'lucide-react';

type Subcategory = {
    id: number;
    name: string;
    url: string;
    title: string;
    description: string;
};

export default function IFrame() {
    const { selectedSubcategory } = useOutletContext<{ selectedSubcategory: Subcategory | null }>();

    if (!selectedSubcategory) {
        return (
            <Box sx={{ p: 6, color: "text.secondary" }}>
                Please select a subcategory from the sidebar.
            </Box>
        );
    }

    return (
        <Card sx={{ boxShadow: 3, borderRadius: 1, overflow: "hidden", marginTop: 2 }}>
            <Box>

            </Box>
            <CardHeader

                title={
                    <Typography variant="h6" color="primary">
                        {selectedSubcategory.name}
                    </Typography>
                }
                subheader={
                    <Typography variant="body2" color="text.secondary">
                        {selectedSubcategory.description}
                    </Typography>
                }
                action={
                    // <Button
                    //     variant="outlined"
                    //     size="small"
                    //     endIcon={<ExternalLink />}
                    //     onClick={() => window.open(selectedSubcategory.url, "_blank")}
                    // >
                    //     Open in New Tab
                    // </Button>
                    <Box display="flex" alignItems="center" gap={3}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Presentation style={{ opacity: 0.5, fontSize: 22 }} />
                            <Typography
                                component="span"
                                sx={{
                                    fontSize: "12px",
                                    color: "text.secondary",
                                    lineHeight: 1,
                                    mt: 1,
                                    display: "inline"
                                }}
                            >
                                Getting Started
                            </Typography>
                        </Box>

                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Video style={{ opacity: 0.5, fontSize: 22 }} />
                            <Typography
                                component="span"
                                sx={{
                                    fontSize: "12px",
                                    color: "text.secondary",
                                    lineHeight: 1,
                                    mt: 1,
                                    display: "inline"
                                }}
                            >
                                Watch Tutorials
                            </Typography>
                        </Box>
                    </Box>

                }

                sx={{ bgcolor: "blue.50", borderBottom: 1, borderColor: "divider", pb: 1 }}
            />
            <Divider />
            <CardContent sx={{ p: 0 }}>
                <Box sx={{ height: "80vh", width: "100%" }}>
                    <iframe
                        src={selectedSubcategory.url}
                        title={selectedSubcategory.name}
                        width="100%"
                        height="100%"
                        frameBorder={0}
                        style={{ border: 0, display: "block" }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </Box>
            </CardContent>
        </Card>
    );
}
