"use client";

import { useUser } from "@/contexts/UserContext";
import { Avatar, Button, FileInput, Flex, Modal, Slider, Stack, Text, Group } from "@mantine/core";
import { DynamicIcon } from "lucide-react/dynamic";
import { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";

interface ChangeAvatarProps {
    opened: boolean;
    open: () => void;
    close: () => void;
}

// Helper function to create cropped image
async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<Blob> {
    const image = new Image();
    image.src = imageSrc;

    await new Promise((resolve) => {
        image.onload = resolve;
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("Could not get canvas context");
    }

    // Set canvas size to the cropped area size
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // Draw the cropped image
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    // Return as blob
    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error("Canvas toBlob failed"));
                }
            },
            "image/jpeg",
            0.9
        );
    });
}

export default function ChangeAvatar({ opened, open, close }: ChangeAvatarProps) {
    const { user } = useUser();

    // State for image handling
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
    const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
    const [step, setStep] = useState<"select" | "crop" | "preview">("select");

    // Handle file selection
    const handleFileChange = (file: File | null) => {
        if (file) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImageSrc(reader.result as string);
                setStep("crop");
                setCrop({ x: 0, y: 0 });
                setZoom(1);
            });
            reader.readAsDataURL(file);
        }
    };

    // Handle crop complete
    const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    // Apply crop and show preview
    const handleApplyCrop = async () => {
        if (imageSrc && croppedAreaPixels) {
            try {
                const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
                setCroppedBlob(blob);  // Blob'u kaydet
                setCroppedImageUrl(URL.createObjectURL(blob));  // URL sadece önizleme için
                setStep("preview");
            } catch (error) {
                console.error("Error cropping image:", error);
            }
        }
    };

    // Go back to crop step
    const handleBackToCrop = () => {
        setStep("crop");
        if (croppedImageUrl) {
            URL.revokeObjectURL(croppedImageUrl);
        }
        setCroppedImageUrl(null);
        setCroppedBlob(null);
    };

    // Reset and close modal
    const handleClose = () => {
        if (croppedImageUrl) {
            URL.revokeObjectURL(croppedImageUrl);
        }
        setImageSrc(null);
        setCroppedBlob(null);
        setCroppedImageUrl(null);
        setStep("select");
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        close();
    };

    // Save the avatar
    const handleSave = async () => {
        if (croppedBlob) {
            try {
                console.log(croppedBlob);

                const formData = new FormData();
                formData.append('avatar', croppedBlob, 'avatar.jpg');

                // TODO: Backend'e gönder
                // await axios.post('/api/user/avatar', formData);

                console.log("Blob ready for upload:", croppedBlob);
                console.log("Size:", croppedBlob.size, "bytes");
                console.log("Type:", croppedBlob.type);

                handleClose();
            } catch (error) {
                console.error("Error saving avatar:", error);
            }
        }
    };

    return (
        <>
            <Modal
                opened={opened}
                onClose={handleClose}
                title="Change Avatar"
                size="md"
            >
                {step === "select" && (
                    <Stack gap="md">
                        <Avatar color="blue" radius={120} size={120} mx="auto" mb="md">
                            {user?.email?.charAt(0).toUpperCase()}
                        </Avatar>
                        <Flex gap="md">
                            <FileInput
                                leftSection={<DynamicIcon name="upload" size={16} />}
                                accept="image/png,image/jpeg"
                                placeholder="Upload image"
                                w="50%"
                                onChange={handleFileChange}
                            />
                            <Button
                                leftSection={<DynamicIcon name="camera" size={16} />}
                                variant="default"
                                w="50%"
                                disabled
                                onClick={() => {
                                    /* TODO: Implement take photo */
                                }}
                            >
                                Take a photo
                            </Button>
                        </Flex>
                    </Stack>
                )}

                {step === "crop" && imageSrc && (
                    <Stack gap="md">
                        <Text size="sm" c="dimmed" ta="center">
                            Drag to reposition, use slider to zoom
                        </Text>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                height: 300,
                                background: "#333",
                                borderRadius: 8,
                            }}
                        >
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                cropShape="round"
                                showGrid={false}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>

                        <Stack gap="xs">
                            <Text size="sm">Zoom</Text>
                            <Slider
                                value={zoom}
                                onChange={setZoom}
                                min={1}
                                max={3}
                                step={0.1}
                                label={(value) => `${Math.round(value * 100)}%`}
                            />
                        </Stack>

                        <Group justify="space-between">
                            <Button
                                variant="default"
                                onClick={() => {
                                    setImageSrc(null);
                                    setStep("select");
                                }}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleApplyCrop}>
                                Apply
                            </Button>
                        </Group>
                    </Stack>
                )}

                {step === "preview" && croppedImageUrl && (
                    <Stack gap="md" align="center">
                        <Text size="sm" c="dimmed" ta="center">
                            Preview your new avatar
                        </Text>

                        <Avatar
                            src={croppedImageUrl}
                            size={150}
                            radius={150}
                        />

                        <Group justify="center" gap="md">
                            <Button
                                variant="default"
                                leftSection={<DynamicIcon name="pencil" size={16} />}
                                onClick={handleBackToCrop}
                            >
                                Edit
                            </Button>
                            <Button
                                leftSection={<DynamicIcon name="check" size={16} />}
                                onClick={handleSave}
                            >
                                Save Avatar
                            </Button>
                        </Group>
                    </Stack>
                )}
            </Modal>

            <Button variant="transparent" onClick={open}>
                Change Avatar
            </Button>
        </>
    );
}
