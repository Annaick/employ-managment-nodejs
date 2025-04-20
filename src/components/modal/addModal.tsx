import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"

  import { Button } from "@/components/ui/button"
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"


import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateEmploye } from "@/services/useCreateEmploye"
import { LoadingSpinner } from "../ui/spinner"
import { Dispatch, SetStateAction } from "react"

const formSchema = z.object({
    nom: z.string().min(3, { message: "Le nom doit être plus de trois(3) charactères" }),
    taux: z.number({
      required_error: "Le taux journalier est requis",
      invalid_type_error: "Le taux doit être un nombre",
    }).min(1, { message: "Le taux journalier doit être supérieur à 0" }),
    jours: z.number({
      required_error: "Le nombre de jours est requis",
      invalid_type_error: "Le nombre de jours doit être un nombre",
    }).min(1, { message: "Le nombre de jours doit être supérieur à 0" }),
  });



export const AddModal = ({open, setOpen}: {open: boolean, setOpen: Dispatch<SetStateAction<boolean>>}) => {

    const { createEmploye, isCreating } = useCreateEmploye()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          nom: "",
          taux: undefined,
          jours: undefined,
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await createEmploye({
                nom: values.nom,
                nombre_de_jours: values.jours,
                taux_journalier: values.taux,
            });
            // Fermer le modal ou réinitialiser le formulaire
            form.reset();
            setOpen(false); 
        } catch (error) {
            console.error("Erreur lors de la création de l'employé:", error);
            
        }
    }

    return (
    <Dialog onOpenChange={(value) => {
        form.reset()
        setOpen(value)
    }} 
    open={open}
    >
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Ajouter un(e) employé(e)</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField 
                    control={form.control}
                    name="nom" 
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                                <Input placeholder="Nom" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="taux" 
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Taux journalier</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="Taux journalier" 
                                    type="number"
                                    min={0}
                                    value={field.value}
                                    onChange={event => field.onChange(+event.target.value)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="jours"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre de jours</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="Nombre de jours" 
                                    type="number"
                                    min={0}
                                    value={field.value}
                                    onChange={event => field.onChange(+event.target.value)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isCreating}>
                    {isCreating && (<LoadingSpinner />)}
                    Ajouter
                </Button>
                </form>
            </Form>

         </DialogContent>
    </Dialog>

    )
}