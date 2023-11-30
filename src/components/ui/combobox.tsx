"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FieldHookConfig, useField } from "formik";

interface Ingredient {
  label: string;
  value: string;
}

/** TODO
 * API call to get Ingredients
 */

export const IngredientSelection: React.FC<
  FieldHookConfig<string> & { label: string }
> = ({ label, ...props }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [debounce, setDebounce] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const controller = useRef(new AbortController());

  let signal = controller.current.signal;

  let [__, _, helpers] = useField(props);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setDebounce(value);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  const fetchIngredient = async () => {
    let url = new URL(`/api/ingredient`, "http://localhost:3000");
    url.searchParams.append("name", debounce);
    console.log(url);

    let response = await fetch(url, {
      method: "GET",
      signal,
    });
    let data = (await response.json()) as {
      ok: boolean;
      ingredients: Ingredient[];
    };
    if (data.ingredients.length < 1) {
      setIngredients([
        {
          label: debounce.charAt(0).toUpperCase() + debounce.slice(1),
          value: debounce.toLocaleLowerCase(),
        },
      ]);
    } else {
      setIngredients(data.ingredients);
    }
    console.log(data);
  };

  useEffect(() => {
    if (open) fetchIngredient();
    helpers.setValue(debounce);
  }, [debounce]);

  useEffect(() => {
    console.log(value, debounce);
  }, [value, debounce]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          id="ingridient"
        >
          {value
            ? ingredients.find((ingredient) => ingredient.value === value)
                ?.label
            : "Select ingredient..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search ingreadients..."
            onValueChange={(e) => setValue(e)}
          />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {ingredients.map((ingredient) => (
              <CommandItem
                key={`combo-${ingredient.value}`}
                value={ingredient.value}
                onSelect={(currentValue) => {
                  setValue(currentValue);
                  setOpen(false);
                  console.log("selected", currentValue, debounce);
                  controller.current.abort("Selected");
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === ingredient.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {ingredient.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
