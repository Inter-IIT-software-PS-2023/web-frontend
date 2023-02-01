import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import "../styles/Home.css";
import img from "../assets/growsimplee.png"
import { useNavigate } from 'react-router-dom';

const GeneralInstruction = () => {
    return (
        <div style={{ height: "100%", display: "flex", justifyContent: "space-around", flexDirection: "column" }}>
            <p>There are three steps involved in executing a last mile delivery operation.</p>
            <ol style={{
                height: "80%",
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "column",
                width: "80%"
            }}>
                <li style={{ marginLeft: "30px" }}>
                    Feeding inputs - providing inputs including the number of orders, order details,
                    number of riders etc. to the application.
                </li>
                <li style={{ marginLeft: "30px" }}>
                    Generating Riders - The riders for the operation will be generated and will be
                    uniquely identified with a pair of credentials.
                </li>
                <li style={{ marginLeft: "30px" }}>
                    Clustering and Delivering: This is the last step of the operation
                </li>
            </ol>

        </div>
    )
}

const FeedInput = () => {
    return (
        <div style={{ height: "100%", display: "flex", justifyContent: "space-around", flexDirection: "column" }}>
            <div style={{ width: "100%", display: "flex", justifyContent: "space-around", flexDirection: "column", height: "120px" }}>
                <p>Input the number of riders and the excel sheet containing all the order details.</p>
                <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    // sx={{ width: "200px" }}
                    variant="standard"
                />
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "space-around", flexDirection: "column", height: "120px" }}>
                <p>Input the number of riders and the excel sheet containing all the order details.</p>
                <div style={{
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                    background: "#fff",
                    border: "1px dashed rgb(115, 115, 115)",
                    cursor: "pointer"
                }}>

                    <label htmlFor="xlsx" style={{
                        cursor: "pointer", textAlign: "center", width: "200px",
                        height: "100%",
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center"
                    }}><input id='xlsx' type="file" style={{ display: "none", cursor: "pointer" }} />Upload File <UploadFileIcon /></label>
                </div>
            </div>

        </div>

    )
}

const GenerateRiders = () => {
    return (
        <div style={{ height: "100%", display: "flex", justifyContent: "space-around", flexDirection: "column" }}>
            <p>
                Click on the button to generate riders for the last mile delivery operation. A pair of
                credentials will be generated for each rider which can be use to sign in to the rider
                app to keep a track of all the orders one has to deliver.
            </p>
            <Button variant="outlined" sx={{ height: "50px" }}>Generate</Button>
        </div>
    )
}

const ClusterAndDeliver = () => {
    return (
        <div style={{ height: "100%", display: "flex", justifyContent: "space-around", flexDirection: "column" }}>
            <p>Click on the button to start the last mile delivery operation. This will cluster
                orders that each rider has to deliver along with the route one has to travel. </p>
            <Button variant="contained" sx={{ height: "50px" }}>
                Proceed
            </Button>
        </div>
    )
}

const steps = [
    {
        label: 'General Instruction',
        component: <GeneralInstruction />
    },
    {
        label: 'Feed Input',
        component: <FeedInput />
    },
    {
        label: 'Generate Riders',
        component: <GenerateRiders />
    },
    {
        label: 'Cluster and Deliver',
        component: <ClusterAndDeliver />
    }
];

export default function VerticalLinearStepper() {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div style={{ background: "#f5f5f5" }}>
            <nav className='nav-home' onClick={() => {
                navigate("/");
            }}>
                <img src={img} alt="" className='logo-img' />
            </nav>
            <Box className='homeBody' sx={{ width: "100vw", padding: 8, pt: 4, mt: "55px", background: "#fff" }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                                optional={
                                    index === 3 ? (
                                        <Typography variant="caption">Last step</Typography>
                                    ) : null
                                }
                            >
                                {step.label}
                            </StepLabel>
                            <StepContent>
                                <Typography style={{ height: "55vh" }}>{step.component}</Typography>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                            disabled={index === 3}
                                        >
                                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                        </Button>
                                        <Button
                                            disabled={index === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Reset
                        </Button>
                    </Paper>
                )}
            </Box>
        </div>

    );
}
