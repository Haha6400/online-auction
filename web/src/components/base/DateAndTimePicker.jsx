import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

export default function DateAndTimePicker(props) {
    const handleCancel = () => {
        props.close();
    };

    const handleAccept = (date) => {
        let formattedDate = dayjs(date.$d).format('HH:mm DD/MM/YYYY')
        console.log('Selected date:', formattedDate);
        // props.updateStartTime(date.$d);
        props.onDateChange(formattedDate);
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={[
                    'DateTimePicker',
                    'StaticDateTimePicker'
                ]}
            >
                <DemoItem>
                    <StaticDateTimePicker
                        defaultValue={dayjs('2024-04-17T15:30')}
                        viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                        }}
                        orientation="landscape"
                        onClose={handleCancel}
                        onAccept={handleAccept}
                        onChange={handleAccept}
                    />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    );
}
