
import React, { useState, useRef, useEffect } from 'react';
import { TYPING_CHALLENGE_DATA } from '../constants';
import { ScoreEntry } from '../types';

const CHALLENGE_POOL = [
  "Science is about knowing; engineering is about doing. - Henry Petroski",
  "I have not failed. I've just found 10,000 ways that won't work. - Thomas Edison",
  "The human footprint in the sand of time is not made by sitting down. - Lord Kelvin",
  "One man's magic is another man's engineering. - Robert Heinlein",
  "Navier-Stokes equations describe the motion of viscous fluid substances in three-dimensional space.",
  "Engineers like to solve problems. If there are no problems available, they will create their own. - Scott Adams",
  "Manufacturing is more than just putting parts together. It is perfecting the engineering. - James Dyson",
  "Geometric Dimensioning and Tolerancing ensures component interchangeability through precise control.",
  "The second law of thermodynamics states that total entropy of an isolated system can never decrease.",
  "A common mistake in designing something foolproof is to underestimate the ingenuity of fools. - Douglas Adams",
  "The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion of the iron.",
  "The Golden Gate Bridge contains over 80,000 miles of steel wire in its two main cables.",
  "The first programmable computer, the Z3, was designed by Konrad Zuse in 1941.",
  "Hedy Lamarr co-invented frequency-hopping technology now used in modern Wi-Fi and Bluetooth.",
  "The Wright brothers' first flight in 1903 lasted only 12 seconds and covered 120 feet.",
  "Ancient Romans built over 400,000 kilometers of roads to connect their vast empire.",
  "The Great Pyramid of Giza was the tallest man-made structure for over 3,800 years.",
  "Apollo 11's guidance computer had less power than a modern electronic toaster.",
  "The Panama Canal used over 4.5 million cubic yards of concrete for its massive locks.",
  "Skyscrapers move. The Burj Khalifa is designed to sway up to 1.5 meters at the very top.",
  "Richard Trevithick built the first working steam locomotive in 1804.",
  "The engineer has been, and is, a maker of history. - James Kip Finch",
  "To the optimist, the glass is half full. To the pessimist, it is half empty. To the engineer, it is twice as big as it needs to be.",
  "Strive for perfection in everything you do. Take the best that exists and make it better. - Henry Royce",
  "Normal people believe that if it ain't broke, don't fix it. Engineers believe that if it ain't broke, it doesn't have enough features yet.",
  "The problem with engineering is that it's too much like real life. - Roelof Botha",
  "Aerodynamics is for people who can't build engines. - Enzo Ferrari",
  "The bridge was built with a factor of safety of four, meaning it can hold four times the expected load.",
  "Internal combustion engines convert chemical energy from fuel into mechanical work through combustion.",
  "The industrial revolution began in the 18th century, transitioning to new manufacturing processes.",
  "Jet engines operate on the principle of Newton's third law: for every action, there is an equal and opposite reaction.",
  "Mechanical advantage is a measure of the force amplification achieved by using a tool or mechanical device.",
  "Torque is the rotational equivalent of linear force, measured in Newton-meters or pound-feet.",
  "Bernoulli's principle states that an increase in the speed of a fluid occurs simultaneously with a decrease in static pressure.",
  "The Bessemer process was the first inexpensive industrial process for the mass production of steel.",
  "Suspension bridges use tension in cables to support the weight of the bridge deck.",
  "Hydraulic systems use pressurized fluids to transmit power and multiply force.",
  "A flywheel is a mechanical device specifically designed to efficiently store rotational energy.",
  "The first industrial robot, Unimate, joined the assembly line at General Motors in 1961.",
  "Sadi Carnot is often described as the father of thermodynamics for his work on heat engines.",
  "The Hoover Dam contains enough concrete to pave a two-lane highway from San Francisco to New York City.",
  "Titanium is as strong as steel but forty-five percent lighter, making it ideal for aerospace engineering.",
  "Nanotechnology involves the manipulation of matter on an atomic, molecular, and supramolecular scale.",
  "The James Webb Space Telescope's mirrors are coated in a thin layer of gold to optimize infrared reflection.",
  "Graphene is a single layer of carbon atoms arranged in a two-dimensional honeycomb lattice.",
  "The Turing Machine is a mathematical model of computation that defines an abstract machine.",
  "A structural engineer's job is to design things that stand up; an architect's job is to make them look good.",
  "The most important thing is to keep the most important thing the most important thing.",
  "Engineering is the professional art of applying science to the optimum conversion of natural resources to the benefit of humankind.",
  "An engineer is someone who uses a slide rule to find out which end of the log to light. - Anonymous",
  "The scientist discovers a new type of material or energy and the engineer discovers a new use for it. - Gordon Lindsay Glegg",
  "I don't spend my time pontificating about high-concept things; I spend my time solving engineering and manufacturing problems. - Elon Musk",
  "An engineer's idea of a perfect date is a 1:1 scale model. - Anonymous",
  "There is nothing so useless as doing efficiently that which should not be done at all. - Peter Drucker",
  "Design is not just what it looks like and feels like. Design is how it works. - Steve Jobs",
  "Engineering is not only study of 45 subjects but it is moral studies of intellectual life. - Prakhar Srivastav",
  "The fewer moving parts, the better. Exactly. No truer words were ever spoken in the context of engineering. - Christian Cantrell",
  "Everything is a product of engineering. If you can't build it, you don't understand it.",
  "The machinist's rule: measure twice, cut once. The engineer's rule: model ten times, measure twice, cut once.",
  "A bridge is a structure built to span physical obstacles without closing the way underneath. It is engineering in its purest form.",
  "The difference between an amateur and a professional is that the professional understands the factor of safety.",
  "Heat always flows from a higher temperature to a lower temperature unless work is performed on the system.",
  "Friction is both a friend and an enemy in mechanical design.",
  "The wheel is perhaps the most important mechanical invention of all time, dating back to 3500 BC.",
  "Archimedes' screw is one of the oldest hydraulic machines still in use today.",
  "The Antikythera mechanism is an ancient Greek analogue computer used to predict astronomical positions.",
  "Leonardo da Vinci's journals contained designs for tanks, helicopters, and parachutes centuries before they were built.",
  "Steam power transformed the world, but it was the governor that made it controllable.",
  "Aluminum 6061 is one of the most versatile alloys, favored for its weldability and structural strength.",
  "Hardness is a measure of a material's resistance to localized plastic deformation.",
  "Toughness is the ability of a material to absorb energy and deform plastically before fracturing.",
  "Stress is internal force per unit area, while strain is the deformation of a material relative to its length.",
  "Nikola Tesla had over 300 patents worldwide.",
  "The first solar cell was built by Charles Fritts in 1883.",
  "Galileo Galilei is considered the father of modern science.",
  "Mechanical engineering is one of the oldest and broadest engineering disciplines.",
  "Isaac Newton's Principia Mathematica laid the foundations for classical mechanics.",
  "The Internal Combustion Engine was perfected by Nikolaus Otto.",
  "The diesel engine was invented by Rudolf Diesel in 1893.",
  "The Kelvin scale is an absolute thermodynamic temperature scale.",
  "The Zeroth Law of Thermodynamics establishes the concept of temperature and thermal equilibrium.",
  "The Reynolds Number is a dimensionless value used to predict fluid flow patterns.",
  "Shear stress is the component of stress coplanar with a material cross section.",
  "Poisson's Ratio is the negative of the ratio of lateral strain to axial strain.",
  "Young's Modulus measures the stiffness of a solid material.",
  "Ductility is a measure of a material's ability to undergo significant plastic deformation before rupture.",
  "Fatigue is the weakening of a material caused by repeatedly applied loads.",
  "Creep is the tendency of a solid material to move slowly or deform permanently under the influence of persistent mechanical stresses.",
  "The Mach Number represents the ratio of flow velocity past a boundary to the local speed of sound.",
  "Specific heat is the amount of heat energy required to raise the temperature of a unit mass of a substance by one degree.",
  "Cavitation is the formation of vapor bubbles in a liquid when the pressure of the liquid falls below its vapor pressure.",
  "The Venturi effect is the reduction in fluid pressure that results when a fluid flows through a constricted section of a pipe.",
  "Inertia is the property of matter by which it continues in its existing state of rest or uniform motion in a straight line.",
  "Kinetic energy is the energy that an object possesses due to its motion.",
  "Potential energy is the energy held by an object because of its position relative to other objects.",
  "A planetary gear set consists of a sun gear, planet gears, and a ring gear.",
  "A universal joint allows a shaft to bend in any direction, and is commonly used in vehicles.",
  "The Watt steam engine was the first type of steam engine to make use of a separate condenser.",
  "Regenerative braking converts kinetic energy into electrical energy to slow down a vehicle.",
  "Tolerance stack-up is the cumulative effect of individual part tolerances on a complete assembly.",
  "Finite Element Analysis is a numerical method for solving problems of engineering and mathematical physics.",
  "Computational Fluid Dynamics uses numerical analysis and data structures to solve and analyze problems that involve fluid flows.",
  "Additive manufacturing, or 3D printing, builds objects layer by layer from digital models.",
  "Subtractive manufacturing removes material from a solid block to create a finished part.",
  "Injection molding is a manufacturing process for producing parts by injecting molten material into a mold.",
  "Die casting is a metal casting process that is characterized by forcing molten metal under high pressure into a mold cavity.",
  "Forging is a manufacturing process involving the shaping of metal using localized compressive forces.",
  "The Carnot cycle is an ideal reversible closed thermodynamic cycle.",
  "Entropy is a measure of the molecular disorder or randomness in a system.",
  "Enthalpy is a property of a thermodynamic system, defined as the sum of the system's internal energy and the product of its pressure and volume.",
  "Conduction is the transfer of heat between substances that are in direct contact with each other.",
  "Convection is the transfer of heat by the movement of a fluid, such as air or water.",
  "Radiation is energy that comes from a source and travels through space at the speed of light.",
  "A heat sink is a passive heat exchanger that transfers the heat generated by an electronic or a mechanical device to a fluid medium.",
  "Sensible heat is the heat exchanged by a thermodynamic system that results in a temperature change.",
  "Latent heat is the energy released or absorbed during a constant-temperature process, such as a phase change.",
  "A refrigerant is a substance used in a heat cycle to transfer heat from one area to another.",
  "The Joule-Thomson effect describes the temperature change of a real gas or liquid when it is forced through a valve or porous plug.",
  "A nozzle is a device designed to control the direction or characteristics of a fluid flow as it exits an enclosed chamber or pipe.",
  "A diffuser is a device for reducing the velocity and increasing the static pressure of a fluid passing through a system.",
  "Pascal's law states that pressure exerted anywhere in a confined incompressible fluid is transmitted equally in all directions throughout the fluid.",
  "A centrifugal pump converts rotational kinetic energy to the hydrodynamic energy of the fluid flow.",
  "A reciprocating pump is a class of positive displacement pumps that utilize a piston or a plunger.",
  "The Otto cycle is an idealized thermodynamic cycle that describes the functioning of a typical spark ignition piston engine.",
  "The Diesel cycle is a combustion process of a reciprocating internal combustion engine.",
  "A flywheel is a mechanical device specifically designed to efficiently store rotational energy.",
  "A cam is a rotating or sliding piece in a mechanical linkage used in transforming rotary motion into linear motion.",
  "A governor is a device used to measure and regulate the speed of a machine, such as an engine.",
  "A bearing is a machine element that constrains relative motion to only the desired motion, and reduces friction between moving parts.",
  "A ball bearing uses balls to maintain the separation between the bearing races.",
  "A roller bearing uses cylinders instead of balls to reduce friction and support heavy loads.",
  "A thrust bearing is a particular type of rotary bearing that is designed to support an axial load.",
  "A clutch is a mechanical device that engages and disengages power transmission especially from a drive shaft to a driven shaft.",
  "A transmission provides speed and torque conversions from a rotating power source to another device.",
  "A differential allows the outer drive wheel to rotate faster than the inner drive wheel during a turn.",
  "The Stefan-Boltzmann law describes the power radiated from a black body in terms of its temperature.",
  "Kirchhoff's law of thermal radiation states that at thermal equilibrium, the emissivity of a body equals its absorptivity.",
  "Fourier's law states that the rate of heat transfer through a material is proportional to the negative gradient in the temperature.",
  "Newton's law of cooling states that the rate of heat loss of a body is directly proportional to the difference in the temperatures between the body and its surroundings.",
  "The Biot number is used in non-steady-state heat transfer calculations.",
  "The Fourier number represents the ratio of the heat conduction rate to the rate of thermal energy storage.",
  "The Grashof number is used in the study of natural convection.",
  "The Rayleigh number is associated with buoyancy-driven flow, also known as free convection or natural convection.",
  "A heat exchanger is a system used to transfer heat between two or more fluids.",
  "The Log Mean Temperature Difference is used to determine the temperature driving force for heat transfer in flow systems.",
  "The Effectiveness-NTU method is used to predict the rate of heat transfer in heat exchangers.",
  "Thermal conductivity is the property of a material to conduct heat.",
  "Thermal diffusivity is the thermal conductivity divided by density and specific heat capacity at constant pressure.",
  "An adiabatic process occurs without transfer of heat or mass between a thermodynamic system and its surroundings.",
  "An isothermal process is a type of thermodynamic process in which the temperature of the system remains constant.",
  "An isobaric process is a thermodynamic process in which the pressure stays constant.",
  "An isochoric process is a thermodynamic process in which the volume remains constant.",
  "A polytropic process is a thermodynamic process that obeys the relation: PV to the power of n equals a constant.",
  "The Rankine cycle is a model used to predict the performance of steam turbine systems.",
  "The Brayton cycle is a thermodynamic cycle that describes the operation of a certain type of heat engine, such as a gas turbine engine.",
  "The refrigeration cycle is a cycle that can be used to transfer heat from a low-temperature region to a high-temperature region.",
  "The Ericsson cycle is a thermodynamic cycle that consists of two isothermal and two isobaric processes.",
  "The Stirling cycle is a thermodynamic cycle that consists of two isothermal and two constant-volume processes.",
  "The triple point of a substance is the temperature and pressure at which the three phases of that substance coexist in thermodynamic equilibrium.",
  "The critical point of a substance is the end point of a phase equilibrium curve.",
  "A phase diagram is a type of chart used to show conditions at which thermodynamically distinct phases occur and coexist at equilibrium.",
  "The Gibbs phase rule is a criterion for the number of degrees of freedom in a multicomponent system at equilibrium.",
  "The Joule effect, also known as resistive heating, is the process by which the passage of an electric current through a conductor produces heat.",
  "The Seebeck effect is the conversion of temperature differences directly into electricity.",
  "The Peltier effect is the presence of heating or cooling at an electrified junction of two different conductors.",
  "The Thomson effect describes the heating or cooling of a current-carrying conductor with a temperature gradient.",
  "The heat pipe is a heat-transfer device that combines the principles of both thermal conductivity and phase transition.",
  "A thermocouple is a sensor used to measure temperature, consisting of two different metals that produce a voltage proportional to a temperature difference.",
  "A Resistance Temperature Detector is a sensor whose resistance changes with temperature.",
  "A thermistor is a type of resistor whose resistance is strongly dependent on temperature.",
  "Thermal expansion is the tendency of matter to change its shape, area, volume, and density in response to a change in temperature.",
  "The coefficient of thermal expansion describes how the size of an object changes with a change in temperature.",
  "Thermal shock is the name given to the way in which some materials are damaged by a sudden change in temperature.",
  "A fin is a surface that extends from an object to increase the rate of heat transfer to or from the environment by increasing convection.",
  "The effectiveness of a fin is the ratio of the fin heat transfer rate to the heat transfer rate that would exist without the fin.",
  "The efficiency of a fin is the ratio of the actual heat transfer rate from the fin to the maximum possible heat transfer rate.",
  "Fouling is the accumulation of unwanted material on solid surfaces to the detriment of function.",
  "A cooling tower is a heat rejection device that rejects waste heat to the atmosphere through the cooling of a water stream to a lower temperature.",
  "A boiler is a closed vessel in which water or other fluid is heated.",
  "A steam turbine is a device that extracts thermal energy from pressurized steam and uses it to do mechanical work on a rotating output shaft.",
  "A condenser is a device or unit used to condense a substance from its gaseous to its liquid state.",
  "An evaporator is a device used in a process to turn the liquid form of a chemical substance into its gaseous form.",
  "A compressor is a mechanical device that increases the pressure of a gas by reducing its volume.",
  "A pump is a device that moves fluids by mechanical action.",
  "A valve is a device that regulates, directs or controls the flow of a fluid by opening, closing, or partially obstructing various passageways.",
  "An orifice plate is a device used for measuring flow rate, for reducing pressure or for restricting flow.",
  "A pitot tube is a pressure measurement instrument used to measure fluid flow velocity.",
  "A manometer is an instrument used to measure pressure.",
  "The Darcy-Weisbach equation is an empirical equation that relates the head loss due to friction along a given length of pipe to the average velocity of the fluid flow.",
  "The Moody chart is a graph in non-dimensional form that relates the Darcy-Weisbach friction factor, Reynolds number, and relative roughness for fully developed flow in a circular pipe.",
  "Head loss is a measure of the reduction in the total head of the fluid as it moves through a fluid system.",
  "Minor losses are pressure drops caused by valves, fittings, and other components in a piping system.",
  "A boundary layer is the layer of fluid in the immediate vicinity of a bounding surface where the effects of viscosity are significant.",
  "Laminar flow is characterized by fluid particles following smooth paths in layers, with each layer moving smoothly past the adjacent layers.",
  "Turbulent flow is a flow regime characterized by chaotic changes in pressure and flow velocity.",
  "Transitional flow is the flow regime that exists between laminar and turbulent flow.",
  "Flow separation occurs when the boundary layer travels far enough against an adverse pressure gradient that the speed of the boundary layer relative to the object falls almost to zero.",
  "Drag is a force acting opposite to the relative motion of any object moving with respect to a surrounding fluid.",
  "Lift is a component of the total aerodynamic force which is perpendicular to the oncoming flow direction.",
  "Skin friction drag is a component of profile drag, which is the drag caused by the viscosity of the fluid.",
  "Pressure drag, or form drag, is caused by the separation of the flow from the surface and the resulting wake.",
  "Vortex shedding is an oscillating flow that takes place when a fluid such as air or water flows past a bluff body at certain velocities.",
  "The Kármán vortex street is a repeating pattern of swirling vortices, caused by a process known as vortex shedding.",
  "Wave drag is a component of the aerodynamic drag on aircraft wings and fuselage and other moving objects.",
  "Induced drag is an aerodynamic drag force that occurs whenever a moving object redirects the airflow coming at it.",
  "The area rule is a design technique used to reduce wave drag.",
  "Supercritical airfoils are designed to delay the onset of wave drag in the transonic speed range.",
  "A winglet is a near-vertical extension of the wingtip that reduces the aerodynamic drag associated with wingtip vortices.",
  "Total pressure is the sum of static pressure and dynamic pressure.",
  "Dynamic pressure is the kinetic energy per unit volume of a fluid.",
  "Stagnation pressure is the static pressure at a stagnation point in a fluid flow.",
  "The angle of attack is the angle between the chord line of an airfoil and the oncoming flow.",
  "The chord of an airfoil is the distance between the leading edge and the trailing edge.",
  "The camber of an airfoil is the asymmetry between the two radiating surfaces of an airfoil.",
  "The aspect ratio of a wing is the ratio of its span to its mean chord.",
  "The bypass ratio of a turbofan engine is the ratio between the mass flow rate of the bypass stream and the mass flow rate entering the core.",
  "A scramjet is a variant of a ramjet airbreathing jet engine in which combustion takes place in supersonic airflow.",
  "A turboprop is a type of turbine engine which drives an aircraft propeller.",
  "A turboshaft is a form of gas turbine that is optimized to produce shaft horsepower rather than jet thrust.",
  "Specific impulse is a measure of how effectively a rocket uses propellant or a jet engine uses fuel.",
  "Thrust is a reaction force described quantitatively by Newton's second and third laws.",
  "The pressure ratio of a compressor is the ratio of the discharge pressure to the suction pressure.",
  "The work of a turbine is the energy extracted from the fluid as it expands through the turbine stages.",
  "Intercooling is the process of removing heat from a gas between compression stages.",
  "Reheating is the process of adding heat to a fluid between expansion stages.",
  "Regeneration is the process of using waste heat from a cycle to preheat a fluid.",
  "The thermal efficiency of a cycle is the ratio of the net work output to the total heat input.",
  "Back work ratio is the ratio of the work required by the compressor to the work produced by the turbine.",
  "The vapor compression refrigeration cycle is the most widely used cycle for refrigerators and air conditioners.",
  "The absorption refrigeration cycle uses a heat source to provide the energy needed to drive the cooling process.",
  "A heat pump is a device that transfers heat energy from a source of heat to what is called a thermal reservoir.",
  "Psychrometrics is the field of engineering concerned with the physical and thermodynamic properties of gas-vapor mixtures.",
  "Relative humidity is the ratio of the partial pressure of water vapor to the equilibrium vapor pressure of water at a given temperature.",
  "Dew point is the temperature to which air must be cooled to become saturated with water vapor.",
  "Dry-bulb temperature is the temperature of air measured by a thermometer freely exposed to the air but shielded from radiation and moisture.",
  "Wet-bulb temperature is the temperature read by a thermometer which is covered in water-soaked cloth over which air is passed.",
  "The humidity ratio is the ratio of the mass of water vapor to the mass of dry air.",
  "A psychrometric chart is a graphical representation of the physical and thermodynamic properties of moist air.",
  "Sensible cooling is the process of removing sensible heat from a substance, resulting in a temperature decrease.",
  "Latent cooling is the process of removing latent heat from a substance, resulting in a phase change.",
  "Humidification is the process of adding moisture to the air.",
  "Dehumidification is the process of removing moisture from the air.",
  "Evaporative cooling is a physical phenomenon in which evaporation of a liquid, typically into surrounding air, cools an object or a liquid in contact with it.",
  "The global warming potential is a measure of how much heat a greenhouse gas traps in the atmosphere up to a specific time horizon, relative to carbon dioxide.",
  "An ozone depletion potential is a relative value that indicates the potential of a substance to destroy ozone in the stratosphere.",
  "The circular economy is a model of production and consumption, which involves sharing, leasing, reusing, repairing, refurbishing and recycling existing materials.",
  "Sustainability is the capacity to endure in a relatively ongoing way across various domains of life.",
  "Life cycle assessment is a technique to assess environmental impacts associated with all the stages of a product's life.",
  "Greenhouse gases are gases in Earth's atmosphere that trap heat.",
  "The carbon footprint is the total amount of greenhouse gases that are generated by our actions.",
  "Renewable energy is energy that is collected from renewable resources, which are naturally replenished on a human timescale.",
  "Solar energy is radiant light and heat from the Sun that is harnessed using a range of technologies.",
  "Wind energy is the use of wind to provide mechanical power through wind turbines.",
  "Hydroelectric energy is energy derived from the power of moving water.",
  "Geothermal energy is thermal energy generated and stored in the Earth.",
  "Biomass is plant or animal material used as fuel to produce electricity or heat.",
  "Nuclear energy is the use of nuclear reactions to produce electricity.",
  "A fuel cell is an electrochemical cell that converts the chemical energy of a fuel and an oxidizing agent into electricity.",
  "A photovoltaic cell is an electrical device that converts the energy of light directly into electricity by the photovoltaic effect.",
  "Energy storage is the capture of energy produced at one time for use at a later time.",
  "A battery is a device consisting of one or more electrochemical cells with external connections for powering electrical devices.",
  "A capacitor is a device that stores electrical energy in an electric field.",
  "Energy density is the amount of energy stored in a given system or region of space per unit volume.",
  "Specific energy is energy per unit mass.",
  "Power is the amount of energy transferred or converted per unit time.",
  "The efficiency of energy conversion is the ratio between the useful output of an energy conversion machine and the input.",
  "Thermodynamic equilibrium is an axiomatic concept of thermodynamics.",
  "A system is in thermal equilibrium when there is no net flow of thermal energy between its components.",
  "Mechanical equilibrium is a state in which the sum of the forces, and the torque, on each particle of the system is zero.",
  "Chemical equilibrium is the state in which both reactants and products are present in concentrations which have no further tendency to change with time.",
  "A quasi-static process is a thermodynamic process that happens slowly enough for the system to remain in internal equilibrium.",
  "A reversible process is a process whose direction can be returned to its original state by inducing infinitesimal changes to some property of the system's surroundings.",
  "Irreversibility is the property of a process such that it cannot be reversed to restore both the system and its surroundings to their original states.",
  "Available energy, or exergy, is the maximum useful work which can be extracted from a system as it comes to equilibrium with a reference state.",
  "The dead state is the state of a system when it is in thermodynamic equilibrium with its environment.",
  "A heat reservoir is a thermodynamic system with a heat capacity that is large enough that when it is in thermal contact with another system of interest, its temperature remains effectively constant.",
  "The Kelvin-Planck statement states that it is impossible for any device that operates on a cycle to receive heat from a single reservoir and produce a net amount of work.",
  "The Clausius statement states that it is impossible to construct a device that operates in a cycle and produces no effect other than the transfer of heat from a lower-temperature body to a higher-temperature body.",
  "A perpetual motion machine of the first kind produces work without the input of energy, violating the first law of thermodynamics.",
  "A perpetual motion machine of the second kind spontaneously converts thermal energy into mechanical work, violating the second law of thermodynamics.",
  "The absolute temperature scale is a scale of temperature that starts at absolute zero.",
  "Absolute zero is the lowest limit of the thermodynamic temperature scale.",
  "The Third Law of Thermodynamics states that the entropy of a system at absolute zero is a well-defined constant.",
  "A pure substance is a form of matter that has constant chemical composition and characteristic properties.",
  "Saturation temperature is the temperature for a corresponding saturation pressure at which a liquid boils into its vapor phase.",
  "Saturation pressure is the pressure for a corresponding saturation temperature at which a liquid boils into its vapor phase.",
  "Compressed liquid is a substance that is not about to vaporize.",
  "Saturated liquid is a substance that exists as a liquid at the saturation temperature and pressure.",
  "Saturated vapor is a substance that exists as a vapor at the saturation temperature and pressure.",
  "Superheated vapor is a vapor at a temperature higher than its vaporization point at the absolute pressure where the temperature is measured.",
  "The quality of a mixture is the ratio of the mass of vapor to the total mass of the mixture.",
  "An ideal gas is a theoretical gas composed of many randomly moving point particles that are not subject to interparticle interactions.",
  "The compressibility factor is a correction factor that describes the deviation of a real gas from ideal gas behavior.",
  "The Reduced pressure is the actual pressure divided by the critical pressure.",
  "The Reduced temperature is the actual temperature divided by the critical temperature.",
  "The Van der Waals equation is an equation of state that generalizes the ideal gas law based on the non-zero size of molecules and the attraction between them.",
  "Boundary work is the work associated with the movement of the boundary of a system.",
  "Flow work is the work required to push a unit mass of fluid into or out of a control volume.",
  "Specific heat at constant volume is the energy required to raise the temperature of a unit mass of a substance by one degree while the volume is held constant.",
  "Specific heat at constant pressure is the energy required to raise the temperature of a unit mass of a substance by one degree while the pressure is held constant.",
  "Internal energy is the energy contained within a system, excluding the kinetic energy of motion of the system as a whole and the potential energy of the system as a whole due to external force fields.",
  "The Joule-Thomson coefficient is the rate of change of temperature with pressure in a Joule-Thomson process.",
  "A closed system is a physical system that does not allow certain types of transfers in or out of the system.",
  "An open system is a system that has external interactions.",
  "A control volume is a mathematical abstraction used in the process of creating mathematical models of physical processes.",
  "Steady flow is a condition in which the fluid properties at a point in the system do not change over time.",
  "Unsteady flow is a flow in which the velocity of the fluid at a point changes with time.",
  "Mass flow rate is the mass of a substance which passes per unit of time.",
  "Volumetric flow rate is the volume of fluid which passes per unit of time.",
  "Conservation of mass states that for any system closed to all transfers of matter and energy, the mass of the system must remain constant over time.",
  "Conservation of energy states that the total energy of an isolated system remains constant.",
  "The first law of thermodynamics is a version of the law of conservation of energy.",
  "Heat transfer is the exchange of thermal energy between physical systems.",
  "Work is the energy transfer associated with a force acting through a distance.",
  "A cycle is a sequence of processes that begins and ends at the same state.",
  "A property is a characteristic of a system.",
  "An intensive property is a physical property of a system that does not depend on the system size or the amount of material in the system.",
  "An extensive property is a physical property of a system that is proportional to the system size or the amount of material in the system.",
  "A state is the condition of a system as described by its properties.",
  "A process is a change in the state of a system.",
  "The path of a process is the series of states through which a system passes during a process.",
  "Equilibrium is a state in which there are no unbalanced potentials within the system.",
  "Static pressure is the pressure of a fluid that is not moving.",
  "The gage pressure is the pressure relative to the atmospheric pressure.",
  "Vacuum pressure is the pressure below the atmospheric pressure.",
  "Absolute pressure is the zero-referenced pressure relative to a perfect vacuum.",
  "Atmospheric pressure is the pressure within the atmosphere of Earth.",
  "The standard atmosphere is a unit of pressure defined as 101,325 pascals.",
  "A barometer is an instrument used to measure atmospheric pressure.",
  "The buoyancy force is the upward force exerted by a fluid that opposes the weight of a partially or fully immersed object.",
  "Archimedes' principle states that the upward buoyant force that is exerted on a body immersed in a fluid is equal to the weight of the fluid that the body displaces.",
  "A fluid is a substance that has no fixed shape and yields easily to external pressure.",
  "Density is the mass per unit volume of a substance.",
  "Specific gravity is the ratio of the density of a substance to the density of a given reference material.",
  "Specific volume is the volume per unit mass of a substance.",
  "Pressure is the force applied perpendicular to the surface of an object per unit area over which that force is distributed.",
  "Temperature is a physical property of matter that quantitatively expresses hot and cold.",
  "A thermometer is a device that measures temperature or a temperature gradient.",
  "Viscosity is a measure of a fluid's resistance to flow.",
  "Dynamic viscosity is the internal friction of a fluid in motion.",
  "Kinematic viscosity is the ratio of dynamic viscosity to density.",
  "Surface tension is the tendency of liquid surfaces at rest to shrink into the minimum surface area possible.",
  "Capillary action is the ability of a liquid to flow in narrow spaces without the assistance of, or even in opposition to, external forces like gravity.",
  "A Newtonian fluid is a fluid in which the viscous stresses arising from its flow, at every point, are linearly proportional to the local strain rate.",
  "A non-Newtonian fluid is a fluid that does not follow Newton's law of viscosity.",
  "Vapor pressure is defined as the pressure exerted by a vapor in thermodynamic equilibrium with its condensed phases at a given temperature in a closed system.",
  "The Mach number is the ratio of the velocity of an object to the velocity of sound in the surrounding medium.",
  "Sonic flow occurs when the Mach number equals one.",
  "Subsonic flow occurs when the Mach number is less than one.",
  "Supersonic flow occurs when the Mach number is greater than one.",
  "Hypersonic flow occurs when the Mach number is greater than five.",
  "A shock wave is a type of propagating disturbance that moves faster than the local speed of sound in the medium.",
  "An oblique shock is a shock wave that is inclined with respect to the incident upstream flow direction.",
  "A normal shock is a shock wave that is perpendicular to the incident upstream flow direction.",
  "Expansion waves are a series of infinitesimal waves that occur when a supersonic flow is turned away from itself.",
  "A converging-diverging nozzle is a tube that is pinched in the middle, used to accelerate a hot, pressurized gas passing through it to a higher supersonic velocity.",
  "The throat of a nozzle is the point of minimum area where the flow velocity is sonic.",
  "Choked flow is a fluid dynamic condition associated with the Venturi effect, where fluid velocity is limited to the speed of sound.",
  "Prandtl-Meyer flow is a physical phenomenon in which a supersonic flow is turned through an angle.",
  "A pitot-static tube is an instrument that combines the functions of a pitot tube and a static port.",
  "The stagnation temperature is the temperature that the fluid would reach if it were brought to rest adiabatically.",
  "The stagnation enthalpy is the enthalpy that the fluid would reach if it were brought to rest adiabatically.",
  "Gas dynamics is a branch of fluid mechanics that deals with flows having significant changes in fluid density.",
  "Aerodynamics is the study of the motion of air, particularly when it interacts with a solid object.",
  "Hydrodynamics is the branch of fluid mechanics that deals with the motion of fluids and the forces acting on solid bodies immersed in fluids.",
  "Hydraulics is a technology and applied science using engineering, chemistry, and other sciences involving the mechanical properties and use of liquids.",
  "Pneumatics is a branch of engineering that makes use of gas or pressurized air.",
  "A hydraulic actuator is a device which converts hydraulic energy into mechanical movement.",
  "A pneumatic actuator is a device which converts the energy of compressed air into mechanical motion.",
  "A hydraulic motor is a mechanical actuator that converts hydraulic pressure and flow into torque and angular displacement.",
  "A pneumatic motor is a type of motor which does mechanical work by expanding compressed air.",
  "A hydraulic cylinder is a mechanical actuator that is used to give a unidirectional force through a unidirectional stroke.",
  "A pneumatic cylinder is a mechanical device which uses the power of compressed gas to produce a force in a reciprocating linear motion.",
  "A solenoid valve is an electromechanically-operated valve.",
  "A pressure relief valve is a type of safety valve used to control or limit the pressure in a system.",
  "A check valve is a valve that normally allows fluid to flow through it in only one direction.",
  "A directional control valve is one of the most fundamental parts in hydraulic and pneumatic systems, allowing fluid flow into different paths from one or more sources.",
  "Hydraulic fluid is the medium by which power is transferred in hydraulic machinery.",
  "A reservoir in a hydraulic system is a container for holding the hydraulic fluid.",
  "A filter is a device that removes contaminants from the hydraulic fluid.",
  "A seal is a device that helps join systems or mechanisms together by preventing leakage.",
  "A gasket is a mechanical seal which fills the space between two or more mating surfaces.",
  "An O-ring is a mechanical gasket in the shape of a torus.",
  "A fitting is used in pipe systems to connect straight sections of pipe or tube, adapt to different sizes or shapes and for other purposes.",
  "A hose is a flexible hollow tube designed to carry fluids from one location to another.",
  "A pipe is a tubular section or hollow cylinder, usually but not necessarily of circular cross-section, used mainly to convey substances which can flow.",
  "A tube is a long hollow cylinder used for conveying or enclosing something.",
  "Standard dimension ratio is a method of rating a pipe's durability against pressure.",
  "Nominal pipe size is a North American set of standard sizes for pipes.",
  "Schedule in piping refers to the wall thickness of the pipe.",
  "A flange is a ribbed or protruding edge, collar or rim, either external or internal, that serves to increase strength or provide a place for the attachment of another object.",
  "Bolting is a mechanical fastener that is used to connect two or more parts.",
  "Welding is a fabrication process that joins materials, usually metals or thermoplastics, by using high heat to melt the parts together and allowing them to cool.",
  "Brazing is a metal-joining process in which two or more metal items are joined together by melting and flowing a filler metal into the joint.",
  "Soldering is a process in which two or more items are joined together by melting and flowing a filler metal into the joint, the filler metal having a lower melting point than the adjoining metal.",
  "Adhesive bonding is a process of joining two or more parts by using a chemical substance.",
  "Mechanical fastening is a process of joining two or more parts by using mechanical devices.",
  "Riveting is a permanent mechanical fastener.",
  "A bolt is a type of threaded fastener with an external male thread.",
  "A screw is a type of fastener, in some ways similar to a bolt, but typically not requiring a nut.",
  "A nut is a type of fastener with a threaded hole.",
  "A washer is a thin plate with a hole that is normally used to distribute the load of a threaded fastener.",
  "The pitch of a thread is the distance from one thread to the next.",
  "The lead of a thread is the axial distance the nut moves in one revolution of the screw.",
  "A power screw is a screw used in a machine to change angular motion into linear motion, and to transmit power.",
  "A ball screw is a mechanical linear actuator that translates rotational motion to linear motion with little friction.",
  "A worm drive is a gear arrangement in which a worm meshes with a worm gear.",
  "A rack and pinion is a type of linear actuator that comprises a circular gear and a linear gear.",
  "A bevel gear is a gear where the axes of the two shafts intersect and the tooth-bearing faces of the gears themselves are conically shaped.",
  "A helical gear is a gear with teeth that are cut at an angle to the axis of the gear.",
  "A spur gear is a gear with teeth that are straight and parallel to the axis of the gear.",
  "The module of a gear is the ratio of the pitch diameter to the number of teeth.",
  "The circular pitch of a gear is the distance from a point on one tooth to the corresponding point on the next tooth, measured along the pitch circle.",
  "The diametral pitch of a gear is the number of teeth per inch of pitch diameter.",
  "The gear ratio is the ratio of the number of teeth on the gear to the number of teeth on the pinion.",
  "The pressure angle of a gear is the angle between the tooth face and the gear radius.",
  "Backlash is the amount of clearance between mated gear teeth.",
  "Interference in gears occurs when the tip of the tooth on one gear digs into the flank of the tooth on the other gear.",
  "Undercutting in gears is the removal of material from the flank of the gear tooth to avoid interference.",
  "A gear train is a mechanical system formed by mounting gears on a frame so that the teeth of the gears engage.",
  "A simple gear train has one gear on each shaft.",
  "A compound gear train has more than one gear on at least one shaft.",
  "An epicyclic gear train consists of one or more outer gears, or planet gears, revolving about a central, or sun gear.",
  "A belt drive is a method of power transmission using a flexible belt and two or more pulleys.",
  "A chain drive is a way of transmitting mechanical power from one place to another using a chain.",
  "A sprocket is a profiled wheel with teeth that mesh with a chain.",
  "A pulley is a wheel on an axle or shaft that is designed to support movement and change of direction of a taut cable or belt.",
  "A V-belt is a type of belt with a V-shaped cross-section.",
  "A timing belt is a type of belt with teeth that mesh with a pulley.",
  "A flat belt is a type of belt with a rectangular cross-section.",
  "The tension in a belt is the force exerted by the belt on the pulleys.",
  "The slack side of a belt is the side with less tension.",
  "The tight side of a belt is the side with more tension.",
  "The creep in a belt is the slight relative motion between the belt and the pulley.",
  "The slip in a belt is the actual relative motion between the belt and the pulley.",
  "Centrifugal tension in a belt is the tension caused by the centrifugal force acting on the belt as it moves over a pulley.",
  "A shaft is a rotating machine element, usually circular in cross section, which is used to transmit power from one part to another.",
  "An axle is a central shaft for a rotating wheel or gear.",
  "A spindle is a rotating axis of a machine, on which a tool or a workpiece is mounted.",
  "The critical speed of a shaft is the speed at which the shaft becomes unstable and vibrates excessively.",
  "Whirling of a shaft is the rotation of the plane made by the line of centers of the shaft and the bearings.",
  "The torsional stiffness of a shaft is the torque required to produce a unit twist in the shaft.",
  "The flexural stiffness of a shaft is the force required to produce a unit deflection in the shaft.",
  "A coupling is a device used to connect two shafts together at their ends for the purpose of transmitting power.",
  "A rigid coupling is used to connect two shafts that are perfectly aligned.",
  "A flexible coupling is used to connect two shafts that may have some misalignment.",
  "A universal coupling, or Hooke's joint, is used to connect two shafts whose axes intersect at an angle.",
  "The Oldham coupling is used to connect two shafts that have a parallel offset.",
  "A key is a piece of metal used to connect a rotating machine element to a shaft.",
  "A keyway is a slot in a shaft or a hub into which a key fits.",
  "A spline is a series of parallel grooves and ridges on a shaft and a hub that allow for power transmission.",
  "The mechanical efficiency of a machine is the ratio of the work output to the work input.",
  "The mechanical advantage of a machine is the ratio of the output force to the input force.",
  "The velocity ratio of a machine is the ratio of the distance moved by the effort to the distance moved by the load.",
  "A simple machine is a mechanical device that changes the direction or magnitude of a force.",
  "A lever consists of a beam or rigid rod pivoted at a fixed hinge, or fulcrum.",
  "An inclined plane is a flat supporting surface tilted at an angle, with one end higher than the other, used as an aid for raising or lowering a load.",
  "A wedge is a triangular shaped tool, and is a portable inclined plane.",
  "A wheel and axle consists of a wheel attached to a smaller axle so that these two parts rotate together in which a force is transferred from one to the other.",
  "A screw is a mechanism that converts rotational motion to linear motion, and a torque to a linear force.",
  "A pulley is a wheel on an axle or shaft that is designed to support movement and change of direction of a taut cable or belt.",
  "The law of machines states that the work input is equal to the work output plus the work lost due to friction.",
  "Reversibility of a machine occurs when the machine is capable of doing work in the reverse direction.",
  "Self-locking in a machine occurs when the machine is not capable of doing work in the reverse direction.",
  "A mechanism is a device that transforms input motions and forces into a desired set of output motions and forces.",
  "A linkage is an assembly of bodies connected to manage forces and movement.",
  "A kinematic pair is a connection between two bodies that constrains their relative motion.",
  "A kinematic chain is an assembly of kinematic pairs.",
  "The degrees of freedom of a mechanism is the number of independent parameters that define its configuration.",
  "Gruebler's criterion is a formula used to calculate the degrees of freedom of a mechanism.",
  "A four-bar linkage is the simplest movable closed-chain linkage.",
  "Grashof's law states that for a four-bar linkage, the sum of the shortest and longest link lengths cannot be greater than the sum of the remaining two link lengths if there is to be continuous relative rotation between two members.",
  "A crank is a link that makes a complete revolution.",
  "A rocker is a link that oscillates through a limited angle.",
  "A connecting rod is a link that connects a crank and a rocker or a slider.",
  "A slider is a link that moves in a straight line.",
  "A slider-crank mechanism is a four-bar linkage with one sliding pair.",
  "The stroke of a slider is the total distance it moves in one cycle.",
  "The displacement of a link is the change in its position.",
  "The velocity of a link is the rate of change of its displacement.",
  "The acceleration of a link is the rate of change of its velocity.",
  "Instantaneous center of rotation is a point in the plane of motion of a body that has zero velocity at a given instant.",
  "The Kennedy-Aronhold theorem states that for three bodies in plane motion, their three instantaneous centers lie on a straight line.",
  "Coriolis acceleration is the acceleration that arises when a body moves in a rotating frame of reference.",
  "A cam is a rotating or sliding piece in a mechanical linkage used in transforming rotary motion into linear motion or vice versa.",
  "A follower is a machine element that is kept in contact with a cam.",
  "The base circle of a cam is the smallest circle that can be drawn tangent to the cam profile.",
  "The prime circle of a cam is the smallest circle that can be drawn tangent to the pitch curve.",
  "The pitch curve of a cam is the path of the follower's trace point as it moves relative to the cam.",
  "The trace point of a follower is a theoretical point used to generate the pitch curve.",
  "The pressure angle of a cam is the angle between the normal to the pitch curve and the direction of the follower's motion.",
  "The stroke of a follower is the total displacement of the follower from its lowest to its highest position.",
  "A dwell is a period during which the follower remains stationary while the cam continues to rotate.",
  "The rise is the part of the cam cycle during which the follower moves away from the cam center.",
  "The return is the part of the cam cycle during which the follower moves toward the cam center.",
  "The profile of a cam is the actual surface of the cam that is in contact with the follower.",
  "Balancing is the process of distributing mass in a rotating or reciprocating system so that the resulting forces and moments are minimized.",
  "Static balancing is the balancing of a body so that its center of mass lies on the axis of rotation.",
  "Dynamic balancing is the balancing of a body so that its principal axis of inertia lies on the axis of rotation.",
  "Primary imbalance in a reciprocating engine is the result of the mass of the pistons and connecting rods.",
  "Secondary imbalance in a reciprocating engine is the result of the non-sinusoidal motion of the pistons.",
  "A vibration is a mechanical phenomenon whereby oscillations occur about an equilibrium point.",
  "Free vibration occurs when a mechanical system is set in motion with an initial input and allowed to vibrate freely.",
  "Forced vibration occurs when an alternating force or motion is applied to a mechanical system.",
  "Damped vibration occurs when the energy of a vibrating system is dissipated by friction and other resistances.",
  "Undamped vibration occurs when there is no energy dissipation in a vibrating system.",
  "Resonance is the phenomenon that occurs when the frequency of a forced vibration matches the natural frequency of the system.",
  "The natural frequency of a system is the frequency at which the system tends to oscillate in the absence of any driving or damping force.",
  "The damping ratio is a dimensionless measure describing how oscillations in a system decay after a disturbance.",
  "The logarithmic decrement is the natural log of the ratio of the amplitudes of any two successive oscillations.",
  "A vibration isolator is a device that reduces the transmission of vibration from one part of a system to another.",
  "Vibration damping is the process of reducing the amplitude of vibrations by dissipating energy.",
  "Torsional vibration is the angular vibration of an object—commonly a shaft along its axis of rotation.",
  "Critical damping is the minimum amount of damping that prevents oscillation.",
  "Overdamping occurs when the damping is greater than the critical damping.",
  "Underdamping occurs when the damping is less than the critical damping.",
  "Vibration monitoring is the process of using sensors to measure the vibration of a machine.",
  "Spectral analysis is the study of the frequency components of a signal.",
  "Fast Fourier Transform is an algorithm that computes the discrete Fourier transform of a sequence.",
  "A sensor is a device that detects and responds to some type of input from the physical environment.",
  "An actuator is a component of a machine that is responsible for moving and controlling a mechanism or system.",
  "Transduction is the process of converting energy from one form to another.",
  "Sensitivity of a sensor is the ratio of the change in output to the change in input.",
  "The resolution of a sensor is the smallest change in input that can be detected.",
  "Linearity of a sensor is the degree to which the output is proportional to the input.",
  "Hysteresis in a sensor is the difference in output for the same input, depending on whether the input is increasing or decreasing.",
  "Drift in a sensor is the slow change in output over time for a constant input.",
  "Response time of a sensor is the time it takes for the output to reach a certain percentage of its final value in response to a step change in input.",
  "A strain gauge is a sensor used to measure the strain on an object.",
  "A piezoelectric sensor is a device that uses the piezoelectric effect to measure changes in pressure, acceleration, temperature, strain, or force.",
  "An accelerometer is a device that measures proper acceleration.",
  "A gyroscope is a device used for measuring or maintaining orientation and angular velocity.",
  "A proximity sensor is a sensor able to detect the presence of nearby objects without any physical contact.",
  "An ultrasonic sensor is an electronic device that measures the distance of a target object by emitting ultrasonic sound waves.",
  "An infrared sensor is an electronic instrument used to sense certain characteristics of its surroundings by either emitting or detecting infrared radiation.",
  "A laser sensor uses a laser to measure distance, position, or displacement.",
  "A load cell is a transducer that is used to create an electrical signal whose magnitude is directly proportional to the force being measured.",
  "A pressure transducer converts pressure into an analog electrical signal.",
  "A flow meter is an instrument used to measure linear, nonlinear, mass or volumetric flow rate of a liquid or a gas.",
  "A tachometer is an instrument measuring the rotation speed of a shaft or disk.",
  "An encoder is a device that converts motion into a sequence of digital pulses.",
  "A resolver is a type of rotary electrical transformer used for measuring degrees of rotation.",
  "A potentiometer is a three-terminal resistor with a sliding or rotating contact that forms an adjustable voltage divider.",
  "A Linear Variable Differential Transformer is a type of electrical transformer used for measuring linear displacement.",
  "A hall effect sensor is a device that is used to measure the magnitude of a magnetic field.",
  "A control system manages, commands, directs, or regulates the behavior of other devices or systems using control loops.",
  "Open-loop control is a type of control in which the control action is independent of the output.",
  "Closed-loop control, or feedback control, is a type of control in which the control action is dependent on the output.",
  "A PID controller is a control loop mechanism employing feedback that is widely used in industrial control systems.",
  "Proportional gain in a PID controller produces an output that is proportional to the current error value.",
  "Integral gain in a PID controller produces an output that is proportional to both the magnitude of the error and the duration of the error.",
  "Derivative gain in a PID controller produces an output that is proportional to the rate of change of the error.",
  "A transfer function is a mathematical representation of the relationship between the input and output of a system.",
  "The Laplace transform is an integral transform that converts a function of a real variable to a function of a complex variable.",
  "A block diagram is a diagram of a system in which the principal parts or functions are represented by blocks connected by lines that show the relationships of the blocks.",
  "Signal flow graph is a specialized type of block diagram.",
  "Stability of a control system is the ability of the system to return to equilibrium after a disturbance.",
  "A system is stable if its output remains bounded for a bounded input.",
  "The Routh-Hurwitz criterion is a mathematical test for the stability of a linear time-invariant control system.",
  "The Root locus method is a graphical method for examining how the roots of a system change with variation of a certain system parameter.",
  "Frequency response is the quantitative measure of the output spectrum of a system or device in response to a stimulus.",
  "A Bode plot is a graph of the frequency response of a system.",
  "A Nyquist plot is a parametric plot of a frequency response used in automatic control and signal processing.",
  "Phase margin is the amount of additional phase lag that can be added to a system before it becomes unstable.",
  "Gain margin is the amount of additional gain that can be added to a system before it becomes unstable.",
  "Steady-state error is the difference between the desired output and the actual output as time approaches infinity.",
  "Overshoot in a control system is the occurrence of a signal or function exceeding its target.",
  "Rise time in a control system is the time taken by a signal to change from a specified low value to a specified high value.",
  "Settling time in a control system is the time elapsed from the application of an ideal step input to the time at which the output has entered and remained within a specified error band.",
  "State-space representation is a mathematical model of a physical system as a set of input, output and state variables related by first-order differential equations.",
  "Controllability is the ability to move a system from any initial state to any other final state in a finite time interval.",
  "Observability is a measure of how well internal states of a system can be inferred from knowledge of its external outputs.",
  "A Programmable Logic Controller is an industrial digital computer which has been ruggedized and adapted for the control of manufacturing processes.",
  "Ladder logic is a programming language used to develop software for PLCs.",
  "SCADA is a control system architecture comprising computers, networked data communications and graphical user interfaces.",
  "A microcontroller is a small computer on a single integrated circuit.",
  "An embedded system is a computer system with a dedicated function within a larger mechanical or electrical system.",
  "Micro-electromechanical systems are the technology of microscopic devices, particularly those with moving parts.",
  "Robotics is an interdisciplinary branch of computer science and engineering.",
  "A robot is a machine—especially one programmable by a computer—capable of carrying out a complex series of actions automatically.",
  "An industrial robot is a robot system used for manufacturing.",
  "The workspace of a robot is the set of all points that can be reached by the robot's end effector.",
  "An end effector is the device at the end of a robotic arm, designed to interact with the environment.",
  "A gripper is a type of end effector used to pick up and hold objects.",
  "Forward kinematics is the use of the kinematic equations of a robot to compute the position of the end-effector from specified values for the joint parameters.",
  "Inverse kinematics is the mathematical process of calculating the variable joint parameters needed to place the end of a kinematic chain in a given position and orientation.",
  "The Jacobian matrix of a robot relates the joint velocities to the end-effector velocities.",
  "A singular configuration of a robot is a configuration in which the robot loses one or more degrees of freedom.",
  "A degree of freedom in robotics is a single joint or a single axis of motion.",
  "Path planning is a term used in robotics for the process of breaking down a desired movement task into discrete motions.",
  "A collaborative robot, or cobot, is a robot intended for direct human-robot interaction within a shared space.",
  "Automated Guided Vehicles are portable robots that follow along marked long lines or wires on the floor, or use radio waves, vision cameras, magnets, or lasers for navigation.",
  "Computer-aided design is the use of computers to aid in the creation, modification, analysis, or optimization of a design.",
  "Computer-aided manufacturing is the use of software to control machine tools and related ones in the manufacturing of workpieces.",
  "Computer-integrated manufacturing is the manufacturing approach of using computers to control the entire production process.",
  "Product lifecycle management is the process of managing the entire lifecycle of a product from inception, through design and manufacture, to service and disposal.",
  "Design for manufacturability is the general engineering practice of designing products in such a way that they are easy to manufacture.",
  "Design for assembly is a process by which products are designed with ease of assembly in mind.",
  "Quality control is a process through which a business seeks to ensure that product quality is maintained or improved.",
  "Total Quality Management consists of organization-wide efforts to install and make a permanent climate where an organization continuously improves its ability to deliver high-quality products.",
  "Six Sigma is a set of techniques and tools for process improvement.",
  "Lean manufacturing is a production method derived from Toyota's 1930 operating model.",
  "Just-in-time manufacturing is a methodology aimed primarily at reducing times within the production system.",
  "A supply chain is a system of organizations, people, activities, information, and resources involved in moving a product or service from supplier to customer.",
  "Logistics is the general management of the flow of things between the point of origin and the point of consumption.",
  "Inventory management is the supervision of non-capitalized assets and stock items.",
  "Material requirements planning is a production planning, scheduling, and inventory control system used to manage manufacturing processes.",
  "Enterprise resource planning is the integrated management of main business processes, often in real-time and mediated by software and technology.",
  "Six Sigma seeks to improve the quality of the output of a process by identifying and removing the causes of defects and minimizing variability.",
  "Statistical process control is a method of quality control which employs statistical methods to monitor and control a process.",
  "A control chart is a graph used to study how a process changes over time.",
  "The process capability index is a statistical measure of the ability of a process to produce output within specified limits.",
  "Metrology is the scientific study of measurement.",
  "Accuracy is the closeness of a measured value to a standard or known value.",
  "Precision is the closeness of two or more measurements to each other.",
  "Uncertainty of measurement is the doubt that exists about the result of any measurement.",
  "Calibration is the process of comparing a measurement from a device against a known standard.",
  "A coordinate-measuring machine is a device that measures the geometry of physical objects.",
  "Non-destructive testing is a wide group of analysis techniques used in science and technology industry to evaluate the properties of a material, component or system without causing damage.",
  "Ultrasonic testing is a family of non-destructive testing techniques based on the propagation of ultrasonic waves in the object or material tested.",
  "Radiographic testing is a non-destructive testing method of inspecting materials for hidden flaws by using the ability of short wavelength electromagnetic radiation to penetrate various materials.",
  "Magnetic particle inspection is a non-destructive testing process for detecting surface and shallow subsurface discontinuities in ferromagnetic materials.",
  "Liquid penetrant inspection is a widely applied and low-cost inspection method used to check surface-breaking defects in all non-porous materials.",
  "Eddy-current testing is one of many electromagnetic testing methods used in non-destructive testing.",
  "Visual inspection is a common method of quality control, data acquisition, and data analysis.",
  "A standard is a document that provides requirements, specifications, guidelines or characteristics that can be used consistently to ensure that materials, products, processes and services are fit for their purpose.",
  "ISO 9000 is a set of international standards on quality management and quality assurance.",
  "ISO 14000 is a family of standards related to environmental management.",
  "The American Society of Mechanical Engineers is a professional association that, in its own words, promotes the art, science, and practice of multidisciplinary engineering and allied sciences around the globe.",
  "The American Society for Testing and Materials is an international standards organization that develops and publishes voluntary consensus technical standards for a wide range of materials, products, systems, and services.",
  "The International Organization for Standardization is an international standard-setting body composed of representatives from various national standards organizations.",
  "Professional engineering is the branch of engineering that is concerned with the design, development, and maintenance of infrastructure, products, and systems.",
  "An engineer's first priority is the safety, health, and welfare of the public.",
  "Ethics in engineering is the field of system of moral principles that apply to the practice of engineering.",
  "Patent law is the branch of law that deals with the protection of inventions.",
  "Copyright law is the branch of law that deals with the protection of original works of authorship.",
  "Trademark law is the branch of law that deals with the protection of symbols, names, and slogans used to identify products and services.",
  "Trade secret law is the branch of law that deals with the protection of confidential business information.",
  "Engineering management is the application of management principles to the practice of engineering.",
  "Project management is the process of leading the work of a team to achieve goals and meet success criteria at a specified time.",
  "Risk management is the identification, evaluation, and prioritization of risks.",
  "Systems engineering is an interdisciplinary field of engineering and engineering management that focuses on how to design, integrate, and manage complex systems over their life cycles."
];

const TypingChallenge: React.FC = () => {
  const [shuffledPhrases, setShuffledPhrases] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [mistakes, setMistakes] = useState(0);
  const [totalKeys, setTotalKeys] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [history, setHistory] = useState<{phrase: string, wpm: number, accuracy: number}[]>([]);
  const [initials, setInitials] = useState('');
  const [personalHistory, setPersonalHistory] = useState<ScoreEntry[]>([]);
  const [showScoreEntry, setShowScoreEntry] = useState(false);
  const [isCheating, setIsCheating] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);

  // Initialize Leaderboard: Only local storage for personal history
  useEffect(() => {
    const saved = localStorage.getItem('mech_high_scores_registry');
    if (saved) {
      try {
        const localScores: ScoreEntry[] = JSON.parse(saved);
        setPersonalHistory(localScores.sort((a, b) => b.score - a.score).slice(0, 20));
      } catch (e) {
        console.error("Failed to parse local registry logs", e);
      }
    }
  }, []);

  useEffect(() => {
    const shuffled = [...CHALLENGE_POOL].sort(() => 0.5 - Math.random());
    setShuffledPhrases(shuffled.slice(0, 5));
  }, []);

  const fullRawPhrase = shuffledPhrases[currentIndex] || "";
  const parts = fullRawPhrase.split(' - ');
  const targetQuote = parts[0];
  const targetAuthor = parts.length > 1 ? parts[1] : null;

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [currentIndex, isFinished, shuffledPhrases, showScoreEntry]);

  useEffect(() => {
    if (startTime && !isFinished && !isCheating) {
      timerRef.current = window.setInterval(() => {
        const timeElapsed = (Date.now() - startTime) / 60000;
        if (timeElapsed > 0.005) {
          const words = userInput.length / 5;
          setWpm(Math.round(words / timeElapsed));
        }
      }, 250);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTime, isFinished, userInput.length, isCheating]);

  const calculateFinalScore = (avgWpm: number, avgAcc: number) => {
    return Math.round(avgWpm * (avgAcc / 100) * 10);
  };

  const nextPhase = () => {
    if (isCheating) return;

    const endTime = Date.now();
    const timeElapsed = (endTime - (startTime || endTime)) / 60000;
    const words = targetQuote.length / 5;
    const finalWpm = Math.round(words / (timeElapsed || 0.001));
    const finalAccuracy = totalKeys > 0 ? Math.max(0, Math.round(((totalKeys - mistakes) / totalKeys) * 100)) : 100;
    
    setHistory(prev => [...prev, { phrase: targetQuote, wpm: finalWpm, accuracy: finalAccuracy }]);
    
    setUserInput('');
    setStartTime(null);
    setMistakes(0);
    setTotalKeys(0);
    setAccuracy(100);
    setWpm(0);

    if (currentIndex < shuffledPhrases.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      setShowScoreEntry(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isCheating) return;
    const val = e.target.value;
    
    const spaceCount = (val.match(/ /g) || []).length;
    const consecutiveSpaces = val.match(/ {3,}/);
    if (spaceCount > val.length * 0.7 || consecutiveSpaces) {
      setIsCheating(true);
      return;
    }

    if (val.length > 6) {
      const lastChars = val.slice(-6).split('');
      if (lastChars.every(char => char === lastChars[0])) {
        setIsCheating(true);
        return;
      }
    }

    if (!startTime && val.length > 0) {
      setStartTime(Date.now());
    }

    if (val.length > userInput.length) {
      setTotalKeys(prev => prev + 1);
      const lastChar = val[val.length - 1];
      const expectedChar = targetQuote[val.length - 1];
      if (lastChar !== expectedChar) {
        setMistakes(prev => prev + 1);
      }
    }

    const currentTotal = totalKeys + (val.length > userInput.length ? 1 : 0);
    const currentMistakes = mistakes + (val.length > userInput.length && val[val.length-1] !== targetQuote[val.length-1] ? 1 : 0);
    if (currentTotal > 0) {
      setAccuracy(Math.max(0, Math.round(((currentTotal - currentMistakes) / currentTotal) * 100)));
    }

    if (val === targetQuote) {
      nextPhase();
    } else {
      setUserInput(val);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && userInput.length >= targetQuote.length) {
      nextPhase();
    }
  };

  const saveScoreToRegistry = () => {
    if (isCheating) return;
    const avgWpm = Math.round(history.reduce((a, b) => a + b.wpm, 0) / history.length);
    const avgAcc = Math.round(history.reduce((a, b) => a + b.accuracy, 0) / history.length);
    const score = calculateFinalScore(avgWpm, avgAcc);
    
    const newEntry: ScoreEntry = {
      initials: (initials || '??').substring(0, 2).toUpperCase(),
      wpm: avgWpm,
      accuracy: avgAcc,
      score,
      timestamp: Date.now()
    };

    const saved = localStorage.getItem('mech_high_scores_registry');
    let localHistory: ScoreEntry[] = [];
    if (saved) {
      try {
        localHistory = JSON.parse(saved);
      } catch (e) {}
    }
    localHistory.push(newEntry);
    const sorted = localHistory.sort((a, b) => b.score - a.score).slice(0, 50);
    localStorage.setItem('mech_high_scores_registry', JSON.stringify(sorted));
    setPersonalHistory(sorted.slice(0, 20));
    
    setShowScoreEntry(false);
  };

  const reInitializeSystem = () => {
    const shuffled = [...CHALLENGE_POOL].sort(() => 0.5 - Math.random());
    setShuffledPhrases(shuffled.slice(0, 5));
    setCurrentIndex(0);
    setUserInput('');
    setStartTime(null);
    setIsFinished(false);
    setShowScoreEntry(false);
    setIsCheating(false);
    setInitials('');
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setTotalKeys(0);
    setHistory([]);
  };

  const downloadRegistry = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(personalHistory, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "personal_score_history.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const renderTargetQuote = () => {
    if (!targetQuote) return null;
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="relative inline text-center font-mono leading-relaxed whitespace-pre-wrap max-w-2xl px-6">
          {targetQuote.split('').map((char, i) => {
            const isTyped = i < userInput.length;
            let color = 'text-white/20';
            if (isTyped) {
              color = userInput[i] === char ? 'text-[#00FF41]' : 'text-red-500 bg-red-900/30';
            }
            return (
              <span key={i} className="relative inline">
                <span className={`${color} transition-colors duration-150`}>{char}</span>
              </span>
            );
          })}
        </div>
        {targetAuthor && (
          <div className="text-sm opacity-40 italic font-mono mt-2 transition-all duration-700 animate-in fade-in">
            — {targetAuthor}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-700">
      
      {/* PERSONAL_SCORE_HISTORY */}
      <div className="border border-white/10 bg-black/40 p-4 space-y-3">
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest">PERSONAL_SCORE_HISTORY / LOCAL_LOGS</h3>
          <div className="flex gap-2">
            <button 
              onClick={downloadRegistry}
              className="text-[10px] px-3 py-1 border border-cyan-500/40 text-cyan-400 transition-all uppercase font-bold hover:bg-cyan-500 hover:text-black flex items-center gap-2"
              title="Export your personal scores"
            >
              <span className="text-sm">💾</span> [EXPORT_LOGS]
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-5 gap-2 text-[9px] uppercase font-bold text-white/30 px-2">
          <span>Rank</span>
          <span>Op_ID</span>
          <span>WPM</span>
          <span>Acc</span>
          <span>Score</span>
        </div>
        
        <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
          {personalHistory.map((s, i) => (
            <div key={`${s.timestamp}-${i}`} className="grid grid-cols-5 gap-2 p-1.5 text-[10px] border-b border-white/5 items-center font-mono bg-white/5">
              <span className="text-cyan-500">#{i + 1}</span>
              <span className="text-yellow-400 font-bold">{s.initials}</span>
              <span className="text-white/80">{s.wpm}</span>
              <span className="text-pink-400/80">{s.accuracy}%</span>
              <span className="text-[#00FF41] font-bold">{s.score}</span>
            </div>
          ))}
          {personalHistory.length === 0 && (
            <div className="text-center py-4 text-white/20 italic text-xs uppercase">No operational history detected.</div>
          )}
        </div>
      </div>

      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold glow-text tracking-tighter uppercase">
          {TYPING_CHALLENGE_DATA.header} / <span className="opacity-60">{TYPING_CHALLENGE_DATA.subHeaderPrefix}{currentIndex + 1}</span>
        </h2>
      </div>

      <div className="relative border border-[#00FF41]/30 bg-black/90 p-12 shadow-[0_0_60px_rgba(0,0,0,1)] overflow-hidden min-h-[450px] flex flex-col justify-center">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#00FF41]/10">
          <div 
            className="h-full bg-[#00FF41] transition-all duration-500 shadow-[0_0_15px_#00FF41]" 
            style={{ width: `${((currentIndex + 1) / (shuffledPhrases.length || 1)) * 100}%` }}
          />
        </div>

        {isCheating ? (
          <div className="text-center space-y-6 animate-in zoom-in duration-300">
             <div className="text-red-500 text-6xl font-bold animate-pulse mb-4 font-mono">!!! CHEAT_DETECTED !!!</div>
             <p className="text-white/60 font-mono text-sm uppercase tracking-widest">Input Buffer Manipulation Detected. Sequence Terminated.</p>
             <button 
              onClick={reInitializeSystem}
              className="px-8 py-3 bg-red-500 text-white font-bold hover:bg-white hover:text-red-500 transition-all uppercase text-xs tracking-widest"
            >
              Reset_Environment
            </button>
          </div>
        ) : !isFinished ? (
          <div className="space-y-16 relative z-10">
            <div className="min-h-[160px] flex items-center justify-center font-mono tracking-tight text-xl md:text-2xl">
              {renderTargetQuote()}
            </div>

            <div className="relative max-w-2xl mx-auto flex flex-col items-center group">
              <div className="w-full relative py-2 text-center border-b-2 border-[#00FF41] group-focus-within:shadow-[0_4px_12px_-4px_#00FF41]">
                <div className="text-xl font-mono min-h-[1.5em] text-center pointer-events-none break-all whitespace-pre-wrap px-4">
                  <span className="text-white inline">
                    {userInput}
                    {!isFinished && (
                      <span className="inline-block w-[1.1ch] h-[1.1em] bg-[#00FF41] animate-pulse opacity-80 shadow-[0_0_8px_#00FF41] align-middle ml-[1px]" />
                    )}
                  </span>
                  {!userInput && !isFinished && (
                    <span className="opacity-40 italic tracking-normal inline-block">AUTHENTICATE_INPUT_STREAM...</span>
                  )}
                </div>
                
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="absolute inset-0 w-full h-full bg-transparent outline-none text-transparent caret-transparent font-mono transition-all z-20"
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
              
              <div className="w-full flex justify-between mt-10 text-[11px] font-mono font-bold uppercase tracking-widest">
                <div className="flex gap-10">
                  <span className="text-yellow-400 flex flex-col">
                    <span className="opacity-40 text-[9px]">LIVE_WPM</span>
                    <span className="text-white text-lg">{wpm || '--'}</span>
                  </span>
                  <span className="text-pink-400 flex flex-col">
                    <span className="opacity-40 text-[9px]">ACCURACY</span>
                    <span className="text-white text-lg">{accuracy}%</span>
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="opacity-40 text-[9px]">SESSION_PROGRESS</span>
                  <span className="text-cyan-400 text-lg">{currentIndex + 1} / {shuffledPhrases.length}</span>
                </div>
              </div>
            </div>
          </div>
        ) : showScoreEntry ? (
          <div className="text-center space-y-10 py-10 animate-in zoom-in duration-500 z-10">
            <h3 className="text-4xl font-bold text-[#00FF41] glow-text italic tracking-tighter">MISSION_COMPLETE</h3>
            <p className="text-sm opacity-60 font-mono tracking-widest uppercase">Operator ID Required [2_CHARS]</p>
            <div className="max-w-xs mx-auto space-y-6">
              <input
                type="text"
                value={initials}
                onChange={(e) => setInitials(e.target.value.substring(0, 2).toUpperCase())}
                className="w-full bg-black border-2 border-[#00FF41]/40 text-center text-5xl font-mono p-4 focus:border-[#00FF41] outline-none shadow-[0_0_15px_rgba(0,255,65,0.1)] text-[#00FF41]"
                placeholder="__"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && initials.length > 0 && saveScoreToRegistry()}
              />
              <button 
                onClick={saveScoreToRegistry}
                disabled={initials.length === 0}
                className="w-full px-10 py-4 bg-[#00FF41] text-black font-bold hover:bg-white transition-all uppercase text-sm tracking-[0.3em] disabled:opacity-20 shadow-[0_0_30px_rgba(0,255,65,0.3)]"
              >
                Archive_Results
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-8 animate-in zoom-in duration-500 z-10">
             <div className="flex justify-center gap-12 mb-8">
                <div>
                   <p className="text-[10px] text-white/40 font-bold uppercase mb-1">FINAL_WPM</p>
                   <p className="text-4xl font-bold text-yellow-400 font-mono">{Math.round(history.reduce((a,b)=>a+b.wpm,0)/history.length)}</p>
                </div>
                <div>
                   <p className="text-[10px] text-white/40 font-bold uppercase mb-1">AVG_ACCURACY</p>
                   <p className="text-4xl font-bold text-pink-400 font-mono">{Math.round(history.reduce((a,b)=>a+b.accuracy,0)/history.length)}%</p>
                </div>
             </div>
             <button 
              onClick={reInitializeSystem}
              className="px-12 py-4 border-2 border-[#00FF41] text-[#00FF41] font-bold hover:bg-[#00FF41] hover:text-black transition-all uppercase text-xs tracking-[0.4em]"
            >
              Start_New_Sequence
            </button>
          </div>
        )}

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#00FF41 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-white/10 p-8 bg-black/40">
          <h4 className="text-xs font-bold text-white/40 mb-5 uppercase tracking-widest border-b border-white/10 pb-2">{TYPING_CHALLENGE_DATA.guidelinesTitle}</h4>
          <div className="space-y-4 font-mono text-[11px] leading-relaxed">
            <div className="p-3 bg-[#00FF41]/5 border-l-2 border-[#00FF41] mb-2">
              <p className="text-[#00FF41] font-bold text-[9px] mb-1">{TYPING_CHALLENGE_DATA.scoreAlgorithmLabel}:</p>
              <p className="text-white text-[12px]">{TYPING_CHALLENGE_DATA.scoreFormula}</p>
            </div>
            <p className="text-white/70">Efficiency is measured by the algorithm which penalizes typos and rewards raw data throughput.</p>
            <p className="text-cyan-400">NOTE: Cursor is optimized to follow text flow across multiple lines. Excessive character repetition triggers security protocols.</p>
            <p className="text-red-400/60 uppercase">Warning: Spacing spamming or buffer injection will trigger security lockout.</p>
          </div>
        </div>

        <div className="border border-white/10 p-8 bg-black/40 flex flex-col justify-center items-center text-center space-y-6">
          <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#00FF41] animate-spin-slow flex items-center justify-center">
            <span className="text-[#00FF41] text-2xl font-bold font-mono">λ</span>
          </div>
          <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest max-w-[280px]">
            {TYPING_CHALLENGE_DATA.benchmarkNote}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TypingChallenge;
