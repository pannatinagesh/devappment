import { GetAll } from '@/components/apiCall';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface json {
    userId: number;
    title: string;
    body: string;
    id: number
}

const useDebouncedData = (val: string, delay: number): string => {
    const [result, setResult] = useState<string>('')

    useEffect(() => {
        const timeId = setTimeout(() => {
            setResult(val)
        }, delay)

        return () => {
            if (timeId) {
                clearTimeout(timeId)
            }
        }
    }, [val, delay])

    return result
}

const JavaScript = () => {
    // const Counter = () => {
    //     let count = 0
    //     return () => ++count
    // }
    // const val = Counter()

    const [state, setState] = useState(0)
    const inputRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [value, setValue] = useState<string>('')
    const [data, setData] = useState<json[]>([])
    const navigate = useNavigate();


    function twoSum(arr: number[], target: number) {
        const res = new Map<number, number>()

        for (let i = 0; i < arr.length; i++) {
            const val = target - arr[i]
            if (res.has(val)) {
                return [res.get(val), i]
            }

            res.set(arr[i], i)
        }

        return []
    }

    console.log(twoSum([2, 7, 11, 15], 9))
    const obj = { name: 'nagesh' }
    const obj1 = { name: 'nagesh' }
    const res = obj1
    console.log(obj === res)

    const getData = async () => {
        const response: any = await GetAll('https://jsonplaceholder.typicode.com/posts', navigate)
        if (response && response.data) {
            setData(response.data)
        }
    }

    const filteredValue: string = useDebouncedData(value, 500)
    const finalData: json[] = useMemo(() => {
        const result = data.filter((v) => v.title.toLocaleLowerCase().includes(filteredValue.toLocaleLowerCase()))
        return result
    }, [filteredValue, data])

    useEffect(() => {
        getData()

        return () => {
            if (inputRef.current) {
                clearInterval(inputRef.current)
            }
        }
    }, [])

    const handleStart = () => {
        if (inputRef.current !== null) return;
        inputRef.current = setInterval(() => {
            setState((prev) => prev + 1)
        }, 1000)
    }

    const handleStop = () => {
        if (inputRef.current) {
            clearInterval(inputRef.current)
            inputRef.current = null
        }
    }

    const handleReset = () => {
        if (inputRef.current) {
            clearInterval(inputRef.current)
            inputRef.current = null
        }
        setState(0)
    }

    const list = document.getElementById("users");

    list?.addEventListener("click", (event) => {
        const target = event.target;

        if (!(target instanceof Element)) {
            return;
        }

        const item = target.closest<HTMLElement>("li[data-id]");

        if (!item || !list.contains(item)) {
            return;
        }

        console.log("Clicked user:", item?.dataset?.id);
    });

    return (
        <div>

            <ul id="users">
                <li data-id="1">John</li>
                <li data-id="2">David</li>
                <li data-id="3">Smith</li>
            </ul>

            <div>{state}</div>

            <div className='flex items-center gap-2 mt-3'>
                <Button onClick={handleStart}>Start</Button>
                <Button onClick={handleStop}>Stop</Button>
                <Button onClick={handleReset}>Reset</Button>
            </div>

            <div className='mt-4'>
                <div>
                    <Input name='search' placeholder='Search Data' value={value} onChange={(e) => setValue(e.target.value)} />
                    <Button>Search</Button>
                </div>
                <div className='overflow-auto h-[69vh] p-3'>

                    {finalData.map((va, i) => {
                        return (
                            <Fragment key={va.id}>
                                <ul className='mb-3'>
                                    <li>{i + 1} {va.title}</li>
                                    <li>{va.body}</li>
                                </ul>
                            </Fragment>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default JavaScript;